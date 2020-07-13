module.exports = function ({ url, slug, name, image, description, ingredients, usage }) {
    const shortDescription = description.slice(0, 80 - 3) + '...';
    return {
        title: `${name}`,
        subtitle: `${shortDescription}`,
        image_url: `${image}`,
        buttons: [{
            type: "postback",
            title: "Show nguyên liệu",
            payload: "Show nl",
        }, {
            type: "web_url",
            title: "Xem chi tiết",
            url: url || `${process.env.HOST_URL}/${slug}`,
            webview_height_ratio: "tall",
            messenger_extensions: true
        }],
    };
}