const express = require("express");
const router = express.Router();

const controller = require("../controllers/CourseController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/user-courses", verifyToken, controller.getUserCourses);
router.get("/trending", controller.getTrendingCourses);
router.get("/recommended", verifyToken, controller.getRecommendedCourses);
router.get("/recently-watched", verifyToken, controller.getRecentlyWatchedCourse);
router.post("/generate-certificate", verifyToken, controller.finishedCourse);
router.get("/certificates", verifyToken, controller.getCertificates);
router.get("/certificate/:id", controller.getIndividualCertificate);

router.get("/:slug", controller.getIndividualCourse);

module.exports = router;
