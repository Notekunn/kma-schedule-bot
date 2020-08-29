const utils = require('./utils');
const { student_code, student_pass } = require('../../.cache/config');
const connect = require('../events/connect');
const { selectSemester, save } = require('../events/save');
const { selectType, selectByDate, selectByWeek, search } = require('../events/search');
module.exports = function (event) {
    console.log("<receive_postback>");
    // Có thể lưu payload dưới dạng JSON string sau đó parse ra lấy thuộc tính action
    const { client } = this;
    const psid = event.sender.id;
    let payload = event.postback.payload;
    payload = utils.isValidJson(payload) ? JSON.parse(payload) : payload;
    const action = typeof payload == 'string' ? payload : payload.action;
    if (!action) return;
    switch (action.toUpperCase()) {
        case "GET_STARTED":
            break;
        case "TEST":
            connect(client, psid, { student_code, student_pass });
            return;
        case "TEST_SAVE":
            selectSemester(client, psid);
            return;
        case "SELECT_SEMESTER":
            save(client, psid, payload.drpSemester);
            return;
        case "TEST_SEARCH":
            selectType(client, psid);
            return;
        case "SEARCH_SCHEDULE":
            if (payload.type == "BY_DATE") selectByDate(client, psid);
            else if (payload.type == "BY_WEEK") selectByWeek(client, psid);
            return;
        case "SEARCH_SCHEDULE_BY_DATE":
            if (payload.type == "THIS_DAY") search(client, psid, "day");
            else client.sendText(psid, `Chưa được hỗ trợ`);
            return;
        case "SEARCH_SCHEDULE_BY_WEEK":
            if (payload.type == "THIS_WEEK") search(client, psid, "week");
            else if (payload.type == "NEXT_WEEK") search(client, psid, "week", "01/09/2020");
            else client.sendText(psid, `Chưa được hỗ trợ`);
            return;
        default:
            break;
    }
    client.sendText(psid, `Title: ${event.postback.title}`);
    client.sendText(psid, `Payload: ${JSON.stringify(payload)}`);
    return;
}