const PsidToFbid = require('psid-to-fbid');
const { dump } = require('dumper.js');
const { MessengerClient } = require('messaging-api-messenger');
const EventEmitter = require('events');
const setupPage = require('./setupPage');
const recieveMessage = require('./message');
const recievePostback = require('./postback');
class Handler extends EventEmitter {
    constructor() {
        super();
        this.client = new MessengerClient({
            accessToken: process.env.PAGE_TOKEN,
            appId: process.env.APP_ID,
            appSecret: process.env.APP_SECRET,
            version: '7.0',
            skipAppSecretProof: true,
        });
        this.psid = new PsidToFbid(process.env.PAGE_ID);
        this.psid.fetchPageToken(process.env.ADMIN_TOKEN);
        this.dump = dump;
        this.on('setup_page', setupPage);
        this.on('receive_hook', this.recieveHook);
        this.on('receive_message', recieveMessage);
        this.on('receive_postback', recievePostback);
    }

    recieveHook(entry) {
        console.log("Hook")
        let { standby = [], messaging = [] } = entry;
        const _self = this;
        const { dump, psid } = this;
        const message_events = standby.concat(messaging);
        message_events.forEach(function (event, i) {
            // console.log(`========= Event #${i + 1} =========`);
            // dump(event);
            let sender = event.sender.id;
            psid.getFromWebhookEvent(event).then(fbid => {
                console.log("Got psid = " + sender + ", fbid = " + fbid);
            });
            if (event.message && event.message.text) _self.emit('receive_message', event);
            if (event.postback) _self.emit('receive_postback', event);
        });
    }

}

module.exports = Handler;