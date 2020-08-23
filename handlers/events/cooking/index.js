const Dish = require("../../../models/Dish");
const elementDish = require("./element");
module.exports = function (client, psid) {
    const elements = [];
    Dish.findRandom(5).then(function (dishes) {
        dishes.forEach(function (dish) {
            elements.push(elementDish(dish));
        });
        client.sendGenericTemplate(psid, elements, { image_aspect_ratio: 'square' });
    });
}