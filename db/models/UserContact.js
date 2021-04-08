module.exports = (sequelize, DataTypes) => {
  const UserContact = sequelize.define("UserContact", {
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return UserContact;
};
