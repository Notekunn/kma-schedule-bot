const PsidToFbid = require('psid-to-fbid');
const { dump } = require('dumper.js');
const { MessengerClient } = require('messaging-api-messenger');
const EventEmitter = require('events');
const setupPage = require('./setupPage');
const recieveMessage = require('./message');
const recievePostback = require('./postback');
const saveUser = require('./saveUser');
const { promptCreate, promptFflush, promptUpdate, promptAsk } = require('./prompt');
const User = require('../models/User');
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
        this.psidToFbid = new PsidToFbid(process.env.PAGE_ID);
        this.psidToFbid.fetchPageToken(process.env.ADMIN_TOKEN);
        this.dump = dump;
        this.cacheInitialize.bind(this)();
        this.on('setup_page', setupPage);
        this.on('receive_hook', this.recieveHook);
        this.on('receive_message', recieveMessage);
        this.on('receive_postback', recievePostback);
        this.on('save_user', saveUser);
        this.on('prompt_create', promptCreate);
        this.on('prompt_update', promptUpdate);
        // this.on('prompt_fflush', promptFflush);
        // this.on('prompt_ask', promptAsk);
    }
    cacheInitialize() {
        this.cache = {};
        this.cache.savedUser = {};
    }
    recieveHook(entry) {
        console.log("<receive_hook>");
        let { standby = [], messaging = [] } = entry;
        const _self = this;
        // const { dump, psidToFbid } = this;
        const message_events = standby.concat(messaging);
        message_events.forEach(async function (event, i) {
            // console.log(`========= Event #${i + 1} =========`);
            // dump(event);
            const psid = event.sender.id;
            const user = await User.findOne({ ps_id: psid });
            if (user && user.currentQuestion && event.message && event.message.text) {
                _self.emit('prompt_update', psid, user.currentQuestion, event.message.text);
                return;
            }
            if (event.message && event.message.text) _self.emit('receive_message', event);
            if (event.postback) _self.emit('receive_postback', event);
            if (!_self.cache.savedUser[psid]) _self.emit('save_user', event);
            return;
        });
    }

}

module.exports = Handler;