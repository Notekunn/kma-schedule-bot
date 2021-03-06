const utils = require('./utils');
const Account = require('../../../models/Account');
module.exports = async function (client, psid, { student_code, student_pass }) {
    client.sendText(psid, `Login with ${student_code} | ${student_pass}`);
    try {
        const { data } = await utils.api.post('/users/login', { studentCode: student_code, password: student_pass });
        if (!data.success) {
            client.sendButtonTemplate(psid, 'Kết nối tài khoản thất bại!', [
                {
                    type: 'web_url',
                    url: `${process.env.HOST_URL}/`,
                    title: 'Đăng nhập qua trang web',
                    webview_height_ratio: "tall",
                    messenger_extensions: true
                },
                {
                    type: 'postback',
                    title: 'Kết nối lại',
                    payload: JSON.stringify({
                        action: "STUDENT_CONNECT"
                    }),
                },
            ]);
            return;
        }
        client.sendText(psid, 'Kết nối tài khoản thành công!');
        data.message && client.sendText(psid, data.message);
        const account = await Account.findOne({ ps_id: psid, studentCode: student_code });
        if (!account) return await Account.create({ ps_id: psid, studentCode: student_code, password: student_pass });
        account.password = student_pass;
        await account.save();
    } catch (error) {
        client.sendText(psid, 'Có lỗi xảy ra trong quá trình kết nối');
        client.sendText(psid, error.message);
    }

}