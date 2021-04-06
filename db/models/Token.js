module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define("Token", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return Token;
};
