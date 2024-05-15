//require passport and bcrypt
const passport = require("passport");
const bcrypt = require("bcrypt");

//define local,github and google strategy
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github").Strategy;

//define user
const User = require("../models/userModel");

//implement local strategy
passport.use(
  //initializing a local strategy by defining a function called verify that takes in parameters username,password,done
  new LocalStrategy(function verify(username, password, done) {
    //using findOne to find if user exists using username as param for finding

    User.findOne({ username: username })
      .then((user) => {
        //if no user return no user found
        if (!user) {
          return done(null, false, { message: "User Not found" });
        }
        //use bcrypt compare method using three parameters and add parameter arrow function
        bcrypt.compare(password, user.password, (error, result) => {
          //console log string that sys result and result variable
          console.log("result", result);
          //if statement to catch errors
          if (error) {
            return done(error);
          }
          return done(null, user);
        });
      })
      .catch((error) => {
        console.log(`There was an error finding user from database: ${error}`);
      });
    //use catch statement to catch error and parameter error
  })
);

//use passport.use to contain github strategy
passport.use(
  new GithubStrategy(
    {
      //define key value pairs and use process .env
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/github",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

//implement google startegy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://codesquad-book.onrender.com",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);
//use passport documentation to serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
