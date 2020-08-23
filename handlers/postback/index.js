const connect = require('../events/connect');
module.exports = function (event) {
    console.log("<receive_postback>");
    const { client } = this;
    const psid = event.sender.id;
    switch (event.postback.payload) {
        case "GET_STARTED":

            break;
        case "TEST":
            connect(client, psid, { student_code: "CT030208", student_pass: "1234" });
            break;

        default:
            break;
    }
    let text = JSON.stringify(event.postback);
    client.sendText(sender, `Echo: ${text.substring(0, 200)}`);
    return;
}