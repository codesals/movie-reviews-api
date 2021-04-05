const { Review, User, Movie } = require("../db/models");


exports.reviewList = async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      order: ["id"],
      attributes: {
        exclude: ["createdAt", "updatedAt", "movieId","userId"],
      },
      include: [
        {model: Movie,
            as: "movie",
             attributes: ["name"]},
        {model: User,
         as: "user",
        attributes: ["username"]},
      ],
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

exports.reviewCreate = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

exports.reviewDelete = async (req, res, next) => {
  const { reviewID } = req.params;
  try {
    const foundReview = await Review.findByPk(reviewID);
    if (foundReview) {
      await foundReview.destroy();
      res.status(200).json({ message: "Review deleted successfully!" });
    } else res.status(404).json({ message: "Revie not found!" });
  } catch (error) {
    next(error);
  }
};

exports.reviewUpdate = async (req, res, next) => {
    const { reviewID } = req.params;
    try {
      const foundReview = await Review.findByPk(reviewID);
      if (foundReview) {
        await foundReview.update(req.body);
        res.status(200).json({ message: "Review updated successfully!" });
      } else res.status(404).json({ message: "Review not found!" });
    } catch (error) {
      next(error);
    }
  };

exports.fetchReview = async (req, res, next) => {
  const { reviewID } = req.params;
  try {
    const review = await Review.findByPk(reviewID, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username"],
      },
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
