const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const genres = require('./src/routes/genres');
const customers = require('./src/routes/customers');
const movies = require('./src/routes/movies');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/movierentalDB';
mongoose.connect(mongoDB)
    .then(()=>{console.log("Connected to MongoDB....");})
    .catch(()=>{console.log("Could not connect to Mongodb...");})

app.use(express.json());
app.use(morgan("dev"));
// apis routes
app.use('/api/v1/genres',genres);
app.use('/api/v1/customers',customers);
app.use('/api/v1/movies',movies);

app.listen(5000,()=>{
    console.log("App is running on ");
});