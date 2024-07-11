const express = require("express");
const router = express.Router();

const controller = require("../controllers/CourseController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/user-courses", verifyToken, controller.getUserCourses);
router.get("/trending", controller.getTrendingCourses);
router.get("/recommended", controller.getRecommendedCourses);
router.get("/:slug", controller.getIndividualCourse);

module.exports = router;
