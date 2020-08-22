module.exports = function (event) {
    console.log("<receive_message>");
    const { client, psid } = this;
    const text = event.message.text;
    const sender = event.sender.id;
    if (text === 'generic') {
        const elements = [{
            title: "First card",
            subtitle: "Element #1 of an hscroll",
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
                type: "web_url",
                url: "https://3000-c5d48a10-3ffd-4635-b0e9-36c6e897295d.ws-us02.gitpod.io/",
                title: "web url"
            }, {
                type: "postback",
                title: "Postback",
                payload: "Payload for first element in a generic bubble",
            }],
        }, {
            title: "Second card",
            subtitle: "Element #2 of an hscroll",
            image_url: "http://messengerdemo.parseapp.com/img/gearvr.png",
            buttons: [{
                type: "postback",
                title: "Postback",
                payload: "BUTTON @2",
            }],
        }];
        client.sendGenericTemplate(sender, elements, { image_aspect_ratio: 'square' });
        return;
    }
    // if (text == 'test') {
    //     client.sendReceiptTemplate(sender, require('./assets/recipient'));
    //     return;
    // }
    // if (text == 'cooking') {
    //     cooking(client, sender);
    // }
    client.sendText(sender, `Echo: ${text.substring(0, 200)}`);
}