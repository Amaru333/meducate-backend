const express = require("express");
const router = express.Router();

const controller = require("../controllers/CourseController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/user-courses", verifyToken, controller.getUserCourses);
router.get("/trending", controller.getTrendingCourses);
router.get("/recommended", verifyToken, controller.getRecommendedCourses);
router.get("/recently-watched", verifyToken, controller.getRecentlyWatchedCourse);

router.get("/:slug", controller.getIndividualCourse);

module.exports = router;
