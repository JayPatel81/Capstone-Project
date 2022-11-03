const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    studentId: {type: String},
    name: {type: String},
    course: {type: String},
    email: {type: String},
    photo: {data: Buffer, contentType: String}
});

let Student = mongoose.model("Student", StudentSchema);

module.exports = Student;