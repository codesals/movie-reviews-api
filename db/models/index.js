"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.hasMany(db.Movie, {
  foreignKey: "userId",
  allowNull: false,
  as: "movie",
});

db.User.hasMany(db.Review, {
  foreignKey: "userId",
  allowNull: false,
  // as: "reviews",
});

db.Movie.hasMany(db.Review, {
  foreignKey: "movieId",
  allowNull: false,
  // as: "reviews",
});

db.Movie.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.Review.belongsTo(db.Movie, {
  foreignKey: "movieId",
  as: "movie",
});
db.Review.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
