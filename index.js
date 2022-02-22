const express = require('express');
const mongoose = require('mongoose');
const app = express();
const genres = require('./src/routes/genres');

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/movierentalDB';
mongoose.connect(mongoDB)
    .then(()=>{console.log("Connected to MongoDB....");})
    .catch(()=>{console.log("Could not connect to Mongodb...");})

app.use(express.json());
// apis routes
app.use('/api/v1/genres',genres);
app.listen(5000,()=>{
    console.log("App is running on ");
});