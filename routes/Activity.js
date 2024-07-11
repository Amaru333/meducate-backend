const express = require("express");
const router = express.Router();

const controller = require("../controllers/ActivityController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/viewing", verifyToken, controller.addViewingActivity);
router.get("/completed-lectures/:course", verifyToken, controller.getCompletedLectures);
router.get("/weekly-watchtime", verifyToken, controller.getWeeklyWatchtime);

module.exports = router;
