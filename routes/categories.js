const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Category, validate } = require('../models/category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let category = new Category({ name: req.body.name });
        category = await category.save();
        res.send(category);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
        });
        if (!category) return res.status(404).send('The category with the given ID was not found.');
        res.send(category);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) return res.status(404).send('The category with the given ID was not found.');
        res.send(category);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send('The category with the given ID was not found.');
        res.send(category);
    }
    catch (ex) {
        res.status(500).send('Something failed')
    }
});


module.exports = router;
