const utils = require('./utils');
module.exports = function (event) {
    console.log("<receive_quick_reply>");
    // Có thể lưu payload dưới dạng JSON string sau đó parse ra lấy thuộc tính action
    const { client } = this;
    const psid = event.sender.id;
    const quick_reply = event.message.quick_reply;
    let payload = quick_reply.payload;
    payload = utils.isValidJson(payload) ? JSON.parse(payload) : payload;
    const action = payload.action;
    if (!action) return;
    switch (action.toUpperCase()) {
        // case "SEARCH_SCHEDULE":

            // return;
    }
    client.sendText(psid, `Title: ${event.message.text}`);
    client.sendText(psid, `Payload: ${JSON.stringify(payload)}`);
    return;
}