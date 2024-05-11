//require passport and bcrypt
const passport = require("passport");
const bcrypt = require("bcrypt");

//handler functions for login

const loginLocalFailed = async (request, response, next) => {
  response.status(401).json({
    message: "Username or password is incorrect",
    statusCode: 401,
  });
};

const logoutRequest = async (request, response, next) => {
  if (error) {
    response.status(400).json({
      message: "Something went wrong",
      statusCode: 400,
    });
  }
  response.status(200).json({
    success: { message: "User logged out" },
    statusCode: 200,
  });
};

const signupRequest = (request, response, next) => {
  //get information from form to be able to add it to the database
  const { firstName, lastName, username, password } = req.body;
  //use bcrypt to hash password
  bcrypt.hash(password, 10, async (error, hashedPassword) => {
    //if error return next error
    if (error) {
      return next(error);
    }
    //if no error can create new user to add to database
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });
    //try catch to create account
    try {
      await newUser.save();
      //use login function to see newUser just created
      req.login(newUser, (error) => {
        //if statement for erro handling
        if (error) {
          response.status(400).json({
            error: { message: "Something went wrong while signing up." },
            statusCode: 400,
          });
        }
      });
    } catch (error) {
      //check error code and see if username exist using if statement
      if (error.code === 1100 && error.keyPattern.username) {
        response.status(400).json({
          error: { message: "username already exists" },
          statusCode: 400,
        });
      } else {
        response.status(500).json({
          error: { message: "Internal server error" },
          statusCode: 500,
        });
      }
    }
  });
};

module.exports = { loginLocalFailed, logoutRequest, signupRequest };
