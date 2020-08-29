const Account = require('../../../models/Account');
const utils = require('./utils');
const item = require('./item');
exports.selectType = async function (client, psid) {
    try {
        const account = await Account.findOne({ ps_id: psid });
        if (!account) throw Error('Tài khoản chưa được kết nối!');
        client.sendButtonTemplate(psid, 'Chọn phương thức tra cứu', utils.typeReplies.map(utils.makeButton));
    } catch (error) {
        client.sendText(psid, error.message);
    }
}
exports.selectByDate = async function (client, psid) {
    try {
        const account = await Account.findOne({ ps_id: psid });
        if (!account) throw Error('Tài khoản chưa được kết nối!');
        client.sendButtonTemplate(psid, 'Chọn phương thức tra cứu', utils.dateReplies.map(utils.makeButton));
    } catch (error) {
        client.sendText(psid, error.message);
    }
}
exports.selectByWeek = async function (client, psid) {
    try {
        const account = await Account.findOne({ ps_id: psid });
        if (!account) throw Error('Tài khoản chưa được kết nối!');
        client.sendButtonTemplate(psid, 'Chọn phương thức tra cứu', utils.weekReplies.map(utils.makeButton));
    } catch (error) {
        client.sendText(psid, error.message);
    }
}
exports.search = async function (client, psid, type, days) {
    try {
        const account = await Account.findOne({ ps_id: psid });
        if (!account) throw Error('Tài khoản chưa được kết nối!');
        if (type == "day") days = utils.getDate(days);
        else if (type = "week") days = utils.getDateInWeek(days);
        else throw Error("Phương thức tra cứu không hợp lệ!");
        const data = await utils.search(account.studentCode, days);
        if (!data || data.length == 0) throw Error('Hôm nay không có lịch học!');
        const schedules = utils.groupBy('day')(data);
        for (day in schedules) {
            await client.sendText(psid, item(day, schedules[day]));
        }
    } catch (error) {
        client.sendText(psid, error.message);
    }
}