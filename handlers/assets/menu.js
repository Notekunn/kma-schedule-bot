module.exports = [
  {
    locale: "default",
    call_to_actions: [
      {
        title: "Khởi động",
        type: "postback",
        payload: "GET_STARTED"
      },
      {
        title: "Trang web",
        type: "nested",
        call_to_actions: [
          {
            title: "Explore",
            type: "nested",
            call_to_actions: [
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
            ]
          },
          {
            title: "W",
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
        ]
      },
      {
        title: "Trang web",
        type: "nested",
        call_to_actions: [
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
        ]
      }
    ]
  }
]