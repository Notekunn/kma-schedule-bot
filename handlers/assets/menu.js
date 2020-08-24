const nestedOneOne = [
    {
        title: "Youtube 1",
        type: "web_url",
        url: "https://www.youtube.com/watch?v=v",
        webview_height_ratio: "tall"
    },
    {
        title: "Facebook 1",
        type: "web_url",
        url: "https://www.facebook.com/w",
        webview_height_ratio: "tall"
    },
    {
        title: "Trang chủ 1",
        type: "web_url",
        url: "https://protocol-facebook.herokuapp.com/",
        webview_height_ratio: "tall"
    }
];
const nestedOne = [
    {
        title: "Khám phá",
        type: "nested",
        call_to_actions: nestedOneOne
    },
    {
        title: "Công cụ khác",
        type: "web_url",
        url: "https://www.facebook.com/w",
        webview_height_ratio: "tall"
    },
    {
        title: "Trang chủ",
        type: "web_url",
        url: "https://protocol-facebook.herokuapp.com/",
        webview_height_ratio: "tall"
    }
];
const nestedTwo = [
    {
        title: "Youtube",
        type: "web_url",
        url: "https://www.youtube.com/watch?v=v",
        webview_height_ratio: "tall"
    },
    {
        title: "Facebook",
        type: "web_url",
        url: "https://www.facebook.com/w",
        webview_height_ratio: "tall"
    },
    {
        title: "Trang chủ",
        type: "web_url",
        url: "https://protocol-facebook.herokuapp.com/",
        webview_height_ratio: "tall",
        messenger_extensions: true
    }
];
module.exports = [
    {
        locale: "default",
        call_to_actions: [
            {
                title: "Khởi động",
                type: "postback",
                payload: JSON.stringify({ action: "GET_STARTED" })
            },
            {
                title: "Công cụ",
                type: "nested",
                call_to_actions: nestedOne
            },
            {
                title: "Giải trí",
                type: "nested",
                call_to_actions: nestedTwo
            }
        ]
    }
]