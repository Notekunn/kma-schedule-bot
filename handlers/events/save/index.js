const Account = require('../../../models/Account');
const utils = require('./utils');
const item = require('./item');
exports.selectSemester = async function (client, psid) {
    console.log('<select_semester>');
    try {
        const account = await Account.findOne({ ps_id: psid });
        if (!account) throw Error('Tài khoản chưa được kết nối!');
        const { data: { error, data } } = await utils.api.get('schedules/semesters', { params: { studentCode: account.studentCode } });
        if (error) throw Error(error.message);
        if (!data || data.length == 0) throw Error("Không tìm được học kỳ nào!");
        client.sendGenericTemplate(psid, data.slice(0, 4).map(item));
        // client.sendGenericTemplate(psid, elements, { image_aspect_ratio: 'square' });
    } catch (error) {
        client.sendText(psid, error.message);
    }
}
exports.save = async function (client, psid, drpSemester) {
    console.log('<save_schedule>', psid, drpSemester);
    try {
        const account = await Account.findOne({ ps_id: psid });
        if (!account) throw Error('Tài khoản chưa được kết nối!');
        if (!drpSemester) throw Error('Học kỳ không hợp lệ!');
        const { data } = await utils.api.post('/schedules/save', { studentCode: account.studentCode, drpSemester });
        if (!data.success && data.error) throw Error(data.error.message);
        if (data.message) client.sendText(psid, data.message);
    } catch (error) {
        client.sendText(psid, error.message);
    }

}