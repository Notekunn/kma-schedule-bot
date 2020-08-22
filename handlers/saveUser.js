const User = require('../models/User');
module.exports = async function saveUser(event) {
    console.log('<save_user>');
    const psid = event.sender.id;
    this.cache.savedUser[psid] = 'pending';
    try {
        const { client, psidToFbid } = this;
        // const fbid = await psidToFbid.getFromWebhookEvent(event);
        // const info = await client.getUserProfile(psid);
        // const user = await User.findOne({ ps_id: psid });
        const [fbid, info, user] = await Promise.all([
            psidToFbid.getFromWebhookEvent(event),
            client.getUserProfile(psid),
            User.findOne({ ps_id: psid })
        ]);
        console.log("Got psid = " + psid + ", fbid = " + fbid);
        if (user) {
            user.fb_id = fbid;
            user.first_name = info.first_name || '';
            user.last_name = info.last_name || '';
            await user.save();
        }
        else {
            const newUser = new User({
                ps_id: psid,
                fb_id: fbid,
                first_name: info.first_name,
                last_name: info.last_name
            });
            await newUser.save();
        }
        console.log(`Lưu thông tin thành công cho user ${psid}|${fbid}`);
        this.cache.savedUser[psid] = true;
    } catch (error) {
        this.cache.savedUser[psid] = undefined;
        console.log(`Có lỗi xảy ra khi save user ${psid}`);
        console.log(error.message);
    }
}