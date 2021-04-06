const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + 900000,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");

    res.json({ authentication: "true", token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const user = req.body;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 900000,
  };
  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  res.json({ authentication: "true", token });
};
