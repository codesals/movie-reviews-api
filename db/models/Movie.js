module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Movie", {
        image: {
            type: DataTypes.STRING,
          },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
        
    });
  };
  