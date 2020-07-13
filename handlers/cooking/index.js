const Dish = require("../../models/Dish");
const elementDish = require("./element");
module.exports = function (client, sender) {
    const elements = [];
    Dish.findRandom(5).then(function (dishes) {
        dishes.forEach(function (dish) {
            elements.push(elementDish(dish));
        });
        client.sendGenericTemplate(sender, elements, { image_aspect_ratio: 'square' });
    });
}