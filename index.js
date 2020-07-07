require('dotenv').config();
const { MessengerClient } = require('messaging-api-messenger');
const { dump } = require('dumper.js');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('port', process.env.PORT || 3000);
app.set('page_token', process.env.PAGE_TOKEN || '');
app.set('verify_token', process.env.VERIFY_TOKEN || '');
app.set('page_id', process.env.PAGE_ID || 4);
const client = new MessengerClient(app.get('page_token'));
app.get('/', function (req, res) {
    res.render('index', { app_id: process.env.APP_ID });
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === app.get('verify_token')) {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
})

function processorHook(entry) {
    let { standby = [], messaging = [] } = entry;
    const message_events = standby.concat(messaging);
    message_events.forEach(function (event, i) {
        console.log(`========= Event #${i + 1} =========`)
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
            client.sendText(sender, `Echo: ${text.substring(0, 200)}`);
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback);
            client.sendText(sender, `Echo: ${text.substring(0, 200)}`);
            return;
        }
    });

}
app.post('/webhook/', function (req, res) {
    const body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(function (entry, i) {
            console.log(`=============== Entry #${i + 1} =============`);
            processorHook(entry);
        });

        res.status(200).send('EVENT_RECEIVED');

    } else {
        res.sendStatus(404);
    }
})

app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})