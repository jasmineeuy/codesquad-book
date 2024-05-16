require("dotenv").config();
require("./config/connection.js");
require("./config/authStrategy.js");
const express = require("express");
const cors = require("cors");

// connect app and add port
const app = express();
const PORT = process.env.PORT || 4000;

//import session and passport
const session = require("express-session");
const passport = require("passport");

const bookRoutes = require("./routes/bookRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

//middleware
const morgan = require("morgan");

const path = require("node:path");
const helmet = require("helmet");
app.use(express.static(path.join(__dirname + "/public")));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUnintialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/books", bookRoutes);
app.use("/", authRoutes);

app.get("/", (request, response, next) => {
  //response.send("This route points to the Homepage");
  response.status(200).json({
    success: {
      message: "This route points to the Homepage",
    },
  });
});

// app.get("/about", (request, response, next) => {
//   //response.send("This route point to the About page");
//   response.status(200).json({
//     success: {
//       message: "This route point to the About page",
//     },
//   });
// });

// app.get("/login", (request, response, next) => {
//   // response.send("This route points to the login page");
//   response.status(200).json({
//     success: {
//       message: "This route points to the login page",
//     },
//   });
// });

// app.get("/admin", (request, response, next) => {
//   //response.send("This route points to the admin page");
//   response.status(200).json({
//     success: {
//       message: "This route points to the admin page",
//     },
//   });
// });

// app.get("/admin/create-book", (request, response, next) => {
//   //response.send("This route points to the create book page");
//   response.status(200).json({
//     success: {
//       message: "This route points to the create book page",
//     },
//   });
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log("http://localhost:4000");
});
