const moment = require('moment')
const db = require('../models')
const functions = require('../utils/functions')
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const getDatesFromDays = (from, to, day) => {
    
    let start = moment(from);
    let end = moment(to);

    var arr = [];
    // Get "next" monday
    let tmp = start.clone().day(day);
    if( tmp.isAfter(start, 'd') ){
    arr.push(tmp.format('MM-DD-YYYY'));
    }
    while( tmp.isBefore(end) ){
    tmp.add(7, 'days');
    if(tmp.isBefore(end)) {
        arr.push(tmp.format('MM-DD-YYYY'));
    }
    }
    return arr
}

exports.RegisterStudent = async (req, res, next) => {
    try {
        var {studentId, name, course, email, photo, term, fromDate, toDate, days} = req.body
        let dates = []
        days.split(',').forEach(day => {
            dates.push(...getDatesFromDays(fromDate, toDate, day))
        })

        let newData = {
            studentId: studentId,
            name: name,
            photo: photo,
            email: email,
            course: course,
            termDetails: {
                term: term,
                from: fromDate,
                to: toDate,
                days: days.split(','),
                dates: dates
            }
        }
        
        var newUser = new db.Student(newData)

        newUser.save()

        res.json({success: true, msg: 'Student registered succesfully', student: newUser})   
        
    } catch (error) {
        console.log(error)
    }
}

exports.getStudents = async (req, res, next) => {
    try {
        var students = await db.Student.find({})
        var newStudents = []
        
        for (let i = 0; i < students.length; i++) {
            var temp = students[i]
            temp.id = i

            newStudents.push(temp)
        }
        
        
        console.log(newStudents);
        res.json({success: true, msg: 'data found', students: students})
    } catch (error) {
        console.log(error);
    }
}

exports.getStudent = async (req, res, next) => {
    try {
        let student = await db.Student.findOne({studentId: req.params.id})

        let att = await db.Attendance.find({'students.id': req.params.id})

        let lectureDates = student.termDetails.dates


        let attendance = []
        let times = []

        for (let i = 0; i < att.length; i++) {
            const attend = att[i];
            
            var result = attend.students.find(item => item.id === req.params.id);
            console.log('result: ', result)
            times.push(result.time)
            attendance.push(moment(attend.date).format('MM-DD-YYYY'))
            // attendance.push({id: uuidv1(), date: attend.date, time: result.time})
        }
        console.log('lecture: ', lectureDates)
        console.log('attendance: ', attendance);
        let finalAttendance = []
        let count = 0
        let present = 0
        let absent = 0
        lectureDates.forEach(l => {
            if(attendance.includes(l)) {
                // present
                finalAttendance.push({id: uuidv1(), date: l, time: times[count], present: 'Present'})
                count = count + 1
                present = present + 1
            } else {
                // absent
                finalAttendance.push({id: uuidv1(), date: l, time: '-', present: 'Absent'})
                absent = absent + 1
            }
        })
        res.json({success: true, msg: 'student fetched', data: {student: student, attendance: finalAttendance, count: [present, absent]}})
    } catch (error) {
        console.log(error);
    }
}

exports.addAttendance = async (req, res, next) => {
    try {
        
        const { spawn } = require('child_process');
        const pyProg = spawn('python', ['sample.py']);
        let studentIds = []
        pyProg.stdout.on('data', async function(data) {
            try {
                let id = data.toString().slice(0,-2)
                console.log(id);
                studentIds.push(id)

                let dateAndTime = functions.getDate()
                let date = dateAndTime[0]
                let time = dateAndTime[1]

                // find if attendance of today
                let resultToday = await db.Attendance.findOne({date: date})

                if(!resultToday) {
                    // new entry
                    let att = new db.Attendance({date: date, students: [{id: id, time: time}]})

                    att.save()
                    console.log('success...');
                    // res.json({success: true, msg: 'attendance for today created successfully', data: att})
                } else {
                    // update student array
                    let resultStudentUpdate = await db.Attendance.findOneAndUpdate(
                        {
                            date: date
                        },
                        {
                            $push: {
                                students: {id: id, time: time}
                            }
                        }
                    )
                    console.log('attendance added!')
                    // if (resultStudentUpdate){
                    //     res.json({success: true, msg: 'student attendance done', data: resultStudentUpdate})
                    // } else {
                    //     res.json({success: false, msg: 'error', data: null})
                    // }
                }
            } catch (error) {
                console.log('error: ', error);
            }
        });
        
    } catch (err) {
        console.log(err);
    }
}

exports.updateTime = async (req, res, next) => {
    try {
        
        let {data, time, studentId} = req.body
        console.log(req.body)

        let update = await db.Attendance.findOneAndUpdate(
            {date: data.date, 'students.id': studentId},
            {
                $set: {'students.$.time': time}
            }
        )

        res.json({success: true, data: update, msg: 'updated time'})

    } catch (error) {
        console.log(error)
    }
}

exports.deleteAttendance = async (req, res, next) => {
    try {
        
        let {data, id} = req.body
        console.log('body: ', req.body)
        
        let d = await db.Attendance.findOneAndUpdate(
            {
                date: moment(data.date).format('MM/DD/YYYY')
            },
            {
                $pull: {
                    students: {
                        id: id
                    }
                }
            }
        )

        let d1 = await db.Student.findOneAndUpdate(
            {
                studentId: id
            },
            {
                $pull: {
                    'termDetails.dates': data.date
                }
            }
        )

        res.json({success: true, data: d, msg: 'attendance deleted'})

    } catch (error) {
        console.log(error)
    }
}