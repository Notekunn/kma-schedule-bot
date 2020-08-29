const moment = require('moment-timezone');
const { TIME_FORMAT, TIME_ZONE } = process.env;
module.exports = function (day, schedules) {
    const thisDay = moment(day);
    let string = `Thứ ${thisDay.day() + 1}, Ngày ${thisDay.format(TIME_FORMAT)}\n`;
    string += "```\n";
    for (let i = 0; i < schedules.length; i++) {
        const { subjectName, teacher, lesson, room } = schedules[i];
        string += `Tiết ${lesson},${lesson + 1},${lesson + 2}:\n`;
        string += `${subjectName}\n`;
        string += `Địa điểm: ${room}\n`;
        if (teacher) string += `Giáo viên: ${teacher}\n`;
        if (i != schedules.length - 1) string += '-'.repeat(15) + '\n';
    }
    string += '\n```';
    return string;
}