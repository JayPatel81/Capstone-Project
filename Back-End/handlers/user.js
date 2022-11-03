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
