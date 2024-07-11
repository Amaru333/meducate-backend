const express = require("express");
const router = express.Router();

const controller = require("../controllers/LectureController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/:id", verifyToken, controller.getLectures);
router.get("/course/:slug", verifyToken, controller.getCourseLectures);

module.exports = router;
