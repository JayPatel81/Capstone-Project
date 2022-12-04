var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.get('/get-students', handle.getStudents)
router.get('/get-student/:id', handle.getStudent)
router.get('/add-attendance', handle.addAttendance)
router.post('/new-student', handle.RegisterStudent )
router.post('/update-time', handle.updateTime)
router.post('/delete-attendance', handle.deleteAttendance)

module.exports = router