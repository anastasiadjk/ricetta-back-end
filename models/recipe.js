const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { categorySchema } = require('./category');

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    category: {
        type: categorySchema,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlenght: 2,
        maxlength: 5000
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);


function validateRecipe(recipe) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        categoryId: Joi.string().required(),
        description: Joi.string().min(2).max(5000).required()
    });
    return schema.validate(recipe);
};


module.exports.Recipe = Recipe;
module.exports.validate = validateRecipe;