require('dotenv').config();
const { MessengerClient } = require('messaging-api-messenger');
const mongoose = require('mongoose');
const { dump } = require('dumper.js');
const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('port', process.env.PORT || 3000);
app.set('page_token', process.env.PAGE_TOKEN || '');
app.set('verify_token', process.env.VERIFY_TOKEN || '');
app.set('page_id', process.env.PAGE_ID || 4);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection
    .once('open', function () {
        console.log("Connection database success!")
    })
    .on('error', function (error) {
        console.log(error.stack);
        process.exit(1);
    });
const client = new MessengerClient({
    accessToken: app.get('page_token'),
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    version: '7.0',
    skipAppSecretProof: true,
});

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
            if (text === 'test') {

                const menu = JSON.parse(fs.readFileSync('./menu.json'))
                client.setMessengerProfile({
                    persistent_menu: menu,
                    psid: sender
                }).then(console.log);
                // client.setPersistentMenu(menu).then(console.log);
            }
            if (text == 'a') {
                client.sendReceiptTemplate(sender, {
                    recipient_name: 'Trần Đức Cường',
                    order_number: '1423',
                    currency: 'VND',
                    payment_method: 'Tiền mặt',
                    order_url: 'http://petersapparel.parseapp.com/order?order_id=123456',
                    timestamp: parseInt(new Date().getTime() / 1000),
                    elements: [
                        {
                            title: 'Áo phông trắng',
                            subtitle: '100% cotton mềm',
                            quantity: 2,
                            price: 50000,
                            currency: 'VND',
                            image_url: 'https://i2.wp.com/lhomme.vn/wp-content/uploads/2019/02/WHITE-SHIRT-080.jpg?fit=678%2C1059&ssl=1',
                        },
                        {
                            title: 'Áo phông nâu',
                            subtitle: '100% cotton mềm',
                            quantity: 1,
                            price: 25000,
                            currency: 'VND',
                            image_url: 'https://cf.shopee.ph/file/e34dfc3e41caa776c3c0fb059cfb1958',
                        },
                    ],
                    address: {
                        street_1: '141 Chiến Thắng',
                        street_2: 'Xóm 6 Nghi Văn',
                        city: 'Hà Nội',
                        postal_code: '94025',
                        state: 'HN',
                        country: 'VN',
                    },
                    summary: {
                        subtotal: 75000,
                        shipping_cost: 4900,
                        total_tax: 6190,
                        total_cost: 56090,
                    },
                    adjustments: [
                        {
                            name: 'Giảm giá cho người mới',
                            amount: 20000,
                        },
                        {
                            name: 'Phiếu giảm giá 10VND',
                            amount: 10000,
                        },
                    ],
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