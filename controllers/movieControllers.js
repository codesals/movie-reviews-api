const { Movie, User } = require("../db/models");

exports.movieList = async (req, res, next) => {
  try {
    const movies = await Movie.findAll({
        order: ["id"],
        attributes: {
          exclude: ["createdAt", "updatedAt","userId"],
        },

        include: {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      });
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

exports.movieCreate = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

exports.movieDelete = async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const foundMovie = await Movie.findByPk(movieID);
    if (foundMovie) {
      await foundMovie.destroy();
      res.status(200).json({ message: "Movie deleted successfully!" });
    } else res.status(404).json({ message: "Movie not found!" });
  } catch (error) {
    next(error);
  }
};

exports.fetchMovie = async (req, res, next) => {
  const { movieID } = req.params;
  try {
    const movie = await Movie.findByPk(movieID, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username"],
      },
    });
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};
