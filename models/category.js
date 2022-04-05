const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    }
})

const Category = mongoose.model('Category', categorySchema);


function validateCategory(category) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(100).required()
    });
    return schema.validate(category);
};


module.exports.Category = Category;
module.exports.categorySchema = categorySchema;
module.exports.validate = validateCategory;
