const mongoose = require("mongoose");
const { Schema } = mongoose;
const DishSchema = new Schema({
    url: String,
    slug: String,
    name: String,
    image: String,
    description: String,
    ingredients: [{
        type: String
    }],
    usage: String,
});
DishSchema.statics.findRandom = async function (size = 5, search = {}) {
    const dishes = await Dish.aggregate([{ $match: search }, { $sample: { size } }]);
    return dishes;
}
const Dish = mongoose.model('dish', DishSchema);

module.exports = Dish;