var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.get('/get-students', handle.getStudents)
router.get('/add-attendance', handle.addAttendance)
router.post('/new-student', handle.RegisterStudent )

module.exports = router