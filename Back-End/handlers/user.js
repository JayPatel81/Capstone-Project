const db = require('../models')


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

                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                let d = mm + '/' + dd + '/' + yyyy
                let t = today.getHours() + ':' + today.getMinutes()
                let result = await db.Student.findOneAndUpdate({'studentId': id}, {'attendance.present': 'yes', 'attendance.date': d, 'attendance.time': t})
            } catch (error) {
                console.log(error);
            }
        });
        
    } catch (err) {
        console.log(err);
    }
}