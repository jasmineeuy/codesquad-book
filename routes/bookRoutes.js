const express = require("express"); // require express and express router

const {
  getAllBooks,
  getBook,
  createBook,
  editBook,
  deleteBook,
} = require("../controllers/bookController");
const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getBook);

router.post("/create/new", createBook);

router.put("/edit/:id", editBook);
router.delete("/delete/:id", deleteBook);
module.exports = router; // export router to access routes from file
