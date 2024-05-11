//require express and passport
const express = require("express");
const passport = require("passport");

//link handler functions from auth controller
const {
  loginLocalFailed,
  signupRequest,
  logoutRequest,
} = require("../controllers/authControllers");

//define router
const router = express.Router();

//create post for login and use passport to authenticate and return username ,first name ia json

router.post(
  "/login/local",
  passport.authenticate("local", { failureRedirect: "/login/local/failed" }),
  (request, response, next) => {
    response.status(200).json({
      success: { message: "user logged in" },
      data: {
        username: request.user.username,
        firstName: request.user.firstName,
        lastName: request.user.lastName,
      },
      statusCode: 200,
    });
  }
);

router.get("/local/login/failed", loginLocalFailed);

router.get("/logout", logoutRequest);

router.post("/signup", signupRequest);

//github strategy

router.get("/login/github", passport.authenticate("github"));

router.get("/login/github/failed", (request, response, next) => {
  response.json({
    message: "There is a problem with github authentication",
  });
});

router.get(
  "/auth/github",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login/github/failed",
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get("/login/google/failed", (request, response, next) => {
  response.json({
    error: { message: "There is a problem with google authentication" },
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login/google/failed",
  })
);

module.exports = router;
