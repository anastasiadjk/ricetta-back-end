const mongoose = require('mongoose');
const categories = require('./routes/categories');
const recipes = require('./routes/recipes');
const express = require('express');
const bodyparser = require('body-parser');


const app = express();
mongoose.connect('mongodb://localhost/ricetta', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));


app.use(bodyparser.json())
require("./cors")(app);
app.use('/api/categories', categories);
app.use('/api/recipes', recipes);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));
