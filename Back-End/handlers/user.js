const db = require('../models')
const functions = require('../utils/functions')
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

exports.RegisterStudent = async (req, res, next) => {
    try {
        var data = req.body
        console.log(req.file, 'this is file', req.body)
        
        var newUser = new db.Student(data)

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

        let attendance = []

        for (let i = 0; i < att.length; i++) {
            const attend = att[i];
            
            var result = attend.students.find(item => item.id === req.params.id);
            // console.log('result: ', result)
            attendance.push({id: uuidv1(), date: attend.date, time: result.time})
        }
        console.log('result: ', attendance);
        res.json({success: true, msg: 'student fetched', data: {student: student, attendance: attendance}})
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