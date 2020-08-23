const connect = require('../events/connect');
const { student_code, student_pass } = require('../../.cache/config');
module.exports = function (event) {
    console.log("<receive_postback>");
    const { client } = this;
    const psid = event.sender.id;
    switch (event.postback.payload) {
        case "GET_STARTED":

            break;
        case "TEST":
            connect(client, psid, { student_code, student_pass });
            return;
            break;

        default:
            break;
    }
    let text = JSON.stringify(event.postback);
    client.sendText(psid, `Echo: ${text.substring(0, 200)}`);
    return;
}