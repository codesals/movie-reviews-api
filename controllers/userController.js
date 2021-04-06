const { User, Token } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// The functions add a user into the database. Firstly it encrypts the password of a user using bcrypt. Then it adds
// the user into database with encrypted password and automatically signs in by generating token.

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: user.id,
      username: newUser.username,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    const tokenExists = await Token.findOne({
      where: { token },
    });
    if (tokenExists) {
      res.json({ authentication: "false", message: "User already signed in" });
    } else {
      await Token.create({ token: token });
      res.json({ authentication: "true", token });
    }
  } catch (error) {
    next(error);
  }
};

// The function generates a token based on a user's credentitals and check if the token already exists. If
// token exists, it means that the user is already signed in. Otherwise it generates the token into database and
// let the user sign in.
exports.signin = async (req, res) => {
  const user = req.body;
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  const tokenExists = await Token.findOne({
    where: { token },
  });
  if (tokenExists) {
    res.json({ authentication: "false", message: "User already signed in" });
  } else {
    await Token.create({ token: token });
    res.json({ authentication: "true", token });
  }
};

// The function check if the user has already signed in. If yes then it deletes the relavent token in the database.
// Once the token is deleted, the user can sign in again.
exports.signout = async (req, res) => {
  const user = req.body;
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  const tokenExists = await Token.findOne({
    where: { token },
  });
  if (tokenExists) {
    tokenExists.destroy();
    res.json({ message: "User Signed out" });
  } else {
    res.json({ message: "Already Signed out" });
  }
};

