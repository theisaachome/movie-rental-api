const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./Genre');

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
      minlength: 5,
      maxlength: 255
    },
    genre: { 
      type: genreSchema,  
      required: true
    },
    numberInStock: { 
      type: Number, 
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: { 
      type: Number, 
      required: true,
      min: 0,
      max: 255
    }
  }
);

function validateMovie(movie) {
 
}

exports.Movie = Movie; 
exports.validate = validateMovie;