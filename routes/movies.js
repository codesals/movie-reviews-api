const express = require("express");
const router = express.Router();

const {
  movieList,
  movieCreate,
  movieDelete,
  fetchMovie,
} = require("../controllers/movieControllers");

router.get("/", movieList);
router.post("/", movieCreate);
router.delete("/:movieID", movieDelete);
router.get("/:movieID", fetchMovie);

module.exports = router;
