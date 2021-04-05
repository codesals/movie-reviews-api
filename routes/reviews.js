const express = require("express");
const router = express.Router();

const {
  reviewList,
  reviewCreate,
  reviewDelete,
  reviewUpdate,
  fetchReview,
} = require("../controllers/reviewControllers");

router.get("/", reviewList);
router.post("/", reviewCreate);
router.delete("/:reviewID", reviewDelete);
router.put("/:reviewID", reviewUpdate);
router.get("/:reviewID", fetchReview);

module.exports = router;
