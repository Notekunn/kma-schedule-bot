const Account = require('../../../models/Account');
const utils = require('./utils');
const item = require('./item');
exports.selectSemester = async function (client, psid) {
    const account = await Account.findOne({ ps_id: psid });
    if (!account) return client.sendText(psid, 'Tài khoản chưa được kết nối!');
    try {
        const { data: { error, data } } = await utils.api.get('schedules/semesters', { params: { studentCode: account.studentCode } });
        if (error) throw Error(error.message);
        if (!data || data.length == 0) throw Error("Không tìm được học kỳ nào!");
        client.sendGenericTemplate(psid, data.slice(0, 4).map(item));
        // client.sendGenericTemplate(psid, elements, { image_aspect_ratio: 'square' });
    } catch (error) {
        client.sendText(psid, error.message);
    }
}