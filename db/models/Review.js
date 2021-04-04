module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Review", {
        content: {
            type: DataTypes.STRING,
          },
        });
    };