const connect = require('../events/connect');
const save = require('../events/save');
const utils = require('./utils');
const { student_code, student_pass } = require('../../.cache/config');
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
            break;
        case "TEST_SAVE":
            save(client, psid);
            return;
            break;
        default:
            break;
    }
    let text = JSON.stringify(event.postback);
    client.sendText(psid, `Echo: ${text.substring(0, 200)}`);
    return;
}