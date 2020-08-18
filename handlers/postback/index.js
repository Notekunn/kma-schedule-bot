module.exports = function (event) {
    const { client, psid } = this;
    const sender = event.sender.id;
    switch (event.postback.payload) {
        case "GET_STARTED":

            break;

        default:
            break;
    }
    let text = JSON.stringify(event.postback);
    client.sendText(sender, `Echo: ${text.substring(0, 200)}`);
    return;
}