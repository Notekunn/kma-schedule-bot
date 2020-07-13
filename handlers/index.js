const fs = require('fs');
const path = require('path');
const { dump } = require('dumper.js');
const Dish = require("../models/Dish");
const { MessengerClient } = require('messaging-api-messenger');
const client = new MessengerClient({
    accessToken: process.env.PAGE_TOKEN,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    version: '7.0',
    skipAppSecretProof: true,
});
// const menu = require("./assets/menu");
// client.setPersistentMenu(menu).then(console.log);
// const domains = require('./assets/domains');
// client.setWhitelistedDomains(domains);
// client.getWhitelistedDomains().then((domains) => {
//     console.log(domains);
// });
function elementDish({ url, slug, name, image, description, ingredients, usage }) {
    const shortDescription = description.slice(0, 80 - 3) + '...';
    return {
        title: `${name}`,
        subtitle: `${shortDescription}`,
        image_url: `${image}`,
        buttons: [{
            type: "postback",
            title: "Show nguyên liệu",
            payload: "Show nl",
        }, {
            type: "web_url",
            title: "Xem chi tiết",
            url: url || `${process.env.HOST_URL}/${slug}`,
            webview_height_ratio: "tall",
            messenger_extensions: true
        }],
    };
}
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
            if (text == 'a') {
                const elements = [];
                Dish.findRandom(5).then(function (dishes) {
                    dishes.forEach(function (dish) {
                        elements.push(elementDish(dish));
                    });
                    client.sendGenericTemplate(sender, elements, { image_aspect_ratio: 'square' });
                });
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

module.exports = processorHook;