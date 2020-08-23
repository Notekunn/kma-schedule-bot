const utils = require('./utils');
module.exports = async function (client, psid, { student_code, student_pass }) {
    client.sendText(psid, `Login with ${student_code} | ${student_pass}`);
    // const data = JSON.stringify({ studentCode: student_code, password: student_pass });
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
                payload: 'STUDENT_CONNECT',
            },
        ]);
        return;
    }
    client.sendText(psid, 'Kết nối tài khoản thành công!');
    data.message && client.sendText(psid, data.message);
}