//const booksData = require("../data/data.js");
//require book model
const Book = require("../models/bookModel");

const getAllBooks = async (request, response, next) => {
  try {
    //using.find to with empty object to return list of books

    await Book.find({}).then((comics) =>
      response.status(200).json({
        success: { message: "Found all books!" },
        data: comics,
        statusCode: 200,
      })
    );
  } catch (error) {
    response.status(400).json({
      error: {
        message: "Something went wrong when getting all books.",
      },
      statusCode: 400,
    });
  }
};

const getBook = async (request, response, next) => {
  const { id } = request.params;

  try {
    //const foundBook = booksData.find((book) => book.id === Number(id));
    //   console.log(foundBook);
    //use book model and findOne to find book with id
    await Book.findOne({ _id: id }).then((foundBook) => {
      response.status(200).json({
        success: { message: "Found the book you are looking for!" },
        data: foundBook,
        statusCode: 200,
      });
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Something went wrong retrieving a book!" },
      statusCode: 400,
    });
  }
};

const createBook = async (request, response, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis } =
    request.body;

  const newBook = {
    title,
    author,
    publisher,
    genre,
    pages,
    rating,
    synopsis,
  };
  try {
    // await newBook.save(),
    booksData.push(newBook);
    response.status(201).json({
      success: { message: "A new book is created" },
      data: newBook,
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Something went wrong when creating the book!" },
      statusCode: 400,
    });
  }
};

const editBook = async (request, response, next) => {
  const { id } = request.params;
  const { title, author, publisher, genre, pages, rating, synopsis } =
    request.body;
  try {
    await Book.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          author,
          publisher,
          genre,
          pages,
          rating,
          synopsis,
        },
      },
      { new: true }
    );
    response.status(201).json({
      success: { message: "Book is updated" },
      data: newBook,
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Something went wrong when making the edit" },
      statusCode: 400,
    });
  }
};

const deleteBook = async (request, response, next) => {
  const { id } = request.params;
  try {
    await Book.findByIdAndDelete(id);
    response.status(200).json({
      success: { message: "Book deleted successfully!" },
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).error({
      error: { message: "Something went wrong while deleting the book" },
      statusCode: 400,
    });
  }
};

module.exports = { getAllBooks, getBook, createBook, editBook, deleteBook };
