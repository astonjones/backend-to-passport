const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    name: { type: String, required: true },
    calories: { type: String, required: true},
    date: { type: Date, require: true },
}, {
    timestamps: true,
})

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;