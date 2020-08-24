const Dish = require("../../../models/Dish");
const item = require("./item");
module.exports = async function (client, psid) {
    try {
        const dishes = await Dish.findRandom(5);
        client.sendGenericTemplate(psid, dishes.map(item), { image_aspect_ratio: 'square' });
    } catch (error) {
        client.sendText(psid, error.message);
    }
}