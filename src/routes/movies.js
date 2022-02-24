const express = require("express");
const {Genre} =require("../model/Genre");
const {Movie,validate} = require("../model/Movie");
const router =express.Router();


// get all

router.get('/',async(req,res,next)=>{
    const movies = await Movie.find().sort("title");
    res.send(movies);
})
// get a single
router.get("/:id",async(req,res,next)=>{
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
})
// create new movie
router.post("/",async(req,res,next)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movie = new Movie({
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();
  
    res.send(movie);

})
// update

router.put('/:id',async(req,res,next)=>{
    const {error} = validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);


  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
})

// delete
router.delete("/:id",async(req,res,next)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
})


module.exports = router;