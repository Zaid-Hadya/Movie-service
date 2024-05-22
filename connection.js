import mongoose from 'mongoose';
import express from 'express';

const app = express();
const port = 3000

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MovieStore').then(() => {
    console.log('Connection has been made...')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }).catch((error) => {
    console.log('Connection error:', error);
  });

  const movieSchema = new mongoose.Schema({
    title: String,
    release_date: String,
  });


  // Create a model from the schema
const MovieModal = mongoose.model('Movies', movieSchema)

app.get("/getMovies", async(req, res) =>{
  const moviesData = await MovieModal.find();
  res.json(moviesData)
});

  