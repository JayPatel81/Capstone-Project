const db = require('../models')
const functions = require('../utils/functions')


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
                    let att = new db.Attendance({date: date, students: [id]})

                    att.save()

                    res.json({success: true, msg: 'attendance for today created successfully', data: att})
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
                console.log(error);
            }
        });
        
    } catch (err) {
        console.log(err);
    }
}