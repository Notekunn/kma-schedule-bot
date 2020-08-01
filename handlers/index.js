const fs = require('fs');
const path = require('path');
const { dump } = require('dumper.js');
const { MessengerClient } = require('messaging-api-messenger');
const client = new MessengerClient({
    accessToken: process.env.PAGE_TOKEN,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    version: '7.0',
    skipAppSecretProof: true,
});

async function setupPage() {
    try {
        console.log("Bắt đầu setup page....");
        const menu = require("./assets/menu");
        const domains = require('./assets/domains');
        const menuResult = await client.setPersistentMenu(menu);
        console.log("Setup menu... ", menuResult);
        const getStartedResult = await client.setGetStarted('GET_STARTED');
        console.log("Setup start button... ", getStartedResult);
        const domainsResult = await client.setWhitelistedDomains(domains);
        console.log("Setup domains... ", domainsResult);
        console.log("Kết thúc setup page....");
    } catch (error) {
        console.log("Có lỗi xảy ra khi setup page....");
        console.log(error.message);
        console.log();
    }
}
const cooking = require("./cooking");
function processorHook(entry) {
    let { standby = [], messaging = [] } = entry;
    const message_events = standby.concat(messaging);
    message_events.forEach(function (event, i) {
        console.log(`========= Event #${i + 1} =========`);
        dump(event);
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text
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
            if (text == 'test') {
                client.sendReceiptTemplate(sender, require('./assets/recipient'));
                return;
            }
            if (text == 'cooking') {
                cooking(client, sender);
            }
            client.sendText(sender, `Echo: ${text.substring(0, 200)}`);
        }
        if (event.postback) {
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
    });

}

module.exports = { processorHook, setupPage };