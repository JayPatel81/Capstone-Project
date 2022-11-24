const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    date: {type: String},
    students: [
        {
            id: {type: String},
            time: {type: String}
        }
    ]
});

let Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;