const mongoose = require("mongoose");

//creating new variable to connect schema for book

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "A title is required"],
  },
  author: {
    type: String,
    required: [true, "A author is required"],
  },
  publisher: {
    type: String,
    required: [true, "A publisher is required"],
  },
  genre: {
    type: String,
    required: [true, "A genre is required"],
  },
  pages: {
    type: Number,
    required: [true, "A number of pages is required"],
  },
  rating: {
    type: Number,
    required: [true, "A number rating is required"],
  },
  synopsis: {
    type: String,
    required: [true, "A synopsis is required"],
  },
  image: {
    type: String,
    required: [true, "An image is required"],
  },
});
// making variable Book which has Book model and use bookSchema
const Book = mongoose.model("comic", bookSchema);

//export the Book variable to be able to be use
module.exports = Book;
