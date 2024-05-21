
const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MovieStore')
  .then(() => {
    console.log('Connection has been made...');
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });

  console.log('Test');