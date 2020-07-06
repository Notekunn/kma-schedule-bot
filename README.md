# 🤖 Creating your own Facebook Messenger bot

## Persident menu


[Tài liệu](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu)

```javascript
// Token page
FB.api(
    '/me/custom_user_settings',
    'POST',
    {
        "persistent_menu":
            [
                {
                    "locale": "default",
                    "composer_input_disabled": false,
                    "call_to_actions": [
                        {
                            "type": "postback",
                            "title": "Talk to an agent",
                            "payload": "CARE_HELP"
                        },
                        {
                            "type": "postback",
                            "title": "Outfit suggestions",
                            "payload": "CURATION"
                        },
                        {
                            "type": "web_url",
                            "title": "Shop now",
                            "url": "https://www.originalcoastclothing.com/",
                            "webview_height_ratio": "full",
                            "messenger_extensions": true        
                        }
                    ]
                }
            ],
        "psid": "2818537434883669" // id app admin
    },
    function (response) {
        // Insert your code here
    }
);
```

## Whitelist domain

[Tài liệu](https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/domain-whitelisting/#requirements)

[https://www.facebook.com/kma.cfs.4.0/settings/?tab=messenger_platform&ref=page_edit](https://www.facebook.com/kma.cfs.4.0/settings/?tab=messenger_platform&ref=page_edit)