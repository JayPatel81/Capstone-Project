var express = require('express');
var router = express.Router();
var handle = require('../handlers')

router.get('/get-students', handle.getStudents)
router.post('/new-student', handle.RegisterStudent )

module.exports = router