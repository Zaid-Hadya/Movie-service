import mongoose from "mongoose";
import express from "express";

const app = express();
app.use(express.json());
const port = 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/MovieStore")
  .then(() => {
    console.log("Connection has been made...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection error:", error);
  });

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// Create a model from the schema
const MovieModel = mongoose.model("Movies", movieSchema, "movies");

app.post("/createMovie", async (req, res) => {
  try {
    const { title, release_date, description, image_url } = req.body;
    const newMovie = new MovieModel({
      title: title,
      release_date: release_date,
      description: description,
      image_url: image_url,
    });
    await newMovie.save();
    res.status(201).json({ status: "true" });
  } catch (error) {
    res.status(400).json({status: "false", error: error.message});
  }
});

app.get("/getMovies", async (req, res) => {
  const moviesData = await MovieModel.find();
  res.status(200).json(moviesData);
});

// Route to get details about an individual movie by ID
app.get("/getMovie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({error: "Invalid movie ID"});
    }

    const movieData = await MovieModel.findById(
      new mongoose.Types.ObjectId(movieId)
    );

    if (!movieData) {
      return res.status(404).json({error: "Movie not found"});
    }
    res.status(200).json(movieData);
  } catch (error) {
    res.status(400).json({error: error});
  }
});
