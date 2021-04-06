const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signup, signin, signout } = require("../controllers/userController");

//There are three routes which run the signup, signin and signut. The functions are implemented in the user controllers.

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post(
  "/signout",
  passport.authenticate("local", { session: false }),
  signout
);

module.exports = router;
