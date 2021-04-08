const { User, Token, UserContact } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");


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

  // const tokenExists = await Token.findOne({
  //   where: { token },
  // });
  if (false) { // if (tokenExists) { if uncommenting
    res.json({ authentication: "false", message: "User already signed in" });
  } else {
    // await Token.create({ token: token });
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

// The function adds user. When we call this function in routes it checks if the users exist. If the users
// exist it checks if they are already friends. If they are already friends it adds them together.
exports.addUser = async (req, res, next) => {
  try {
    const user1 = await User.findByPk(req.params.userId);
    const user2 = await User.findByPk(req.body.userId);
    const exist = await UserContact.findAll({
      where: {
        userId: user1.id,
        contact: user2.username,
      },
    });

    if (exist.length > 0) {
      res.json({ message: "Already in each other's contacts" });
    } else {
      if (user1 && user2) {
        await UserContact.create({ userId: user1.id, contact: user2.username });
        await UserContact.create({ userId: user2.id, contact: user1.username });
        res.json({ message: "user added in each other's contacts" });
      } else {
        res.json({ message: "At least 1 user id is wrong" });
      }
    }
  } catch (error) {
    next(error);
  }
};

//The function is there to test the add user function. It gives all the contacts of a provided user.

exports.getUserContacts = async (req, res, next) => {
  try {
    const contactInfo = await UserContact.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    let contacts = [];
    contactInfo.map((contact) => {
      contacts.push(contact.contact);
    });

    res.json({ contacts: contacts });
  } catch (error) {
    next(error);
  }
};
