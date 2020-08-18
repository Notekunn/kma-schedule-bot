const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduleSchema = new Schema({
    studentCode: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    lesson: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
});
const Schedule = mongoose.model('schedule', ScheduleSchema);

module.exports = Schedule;