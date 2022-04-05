const { Recipe, validate } = require('../models/recipe');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const category = await Category.findById(req.body.categoryId);
        if (!category) return res.status(400).send('Invalid category.');

        let recipe = new Recipe({
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            description: req.body.description
        });
        recipe = await recipe.save();

        res.send(recipe);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const category = await Category.findById(req.body.categoryId);
        if (!category) return res.status(400).send('Invalid category.');

        const recipe = await Recipe.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                category: {
                    _id: category._id,
                    name: category.name
                },
                description: req.body.description
            }, { new: true });

        if (!recipe) return res.status(404).send('The recipe with the given ID was not found.');

        res.send(recipe);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndRemove(req.params.id);
        if (!recipe) return res.status(404).send('The recipe with the given ID was not found.');
        res.send(recipe);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send('The recipe with the given ID was not found.');
        res.send(recipe);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

module.exports = router; 
