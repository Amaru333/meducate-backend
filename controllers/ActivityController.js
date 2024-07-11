const ViewingActivity = require("../models/viewingActivityModel");
const CourseModel = require("../models/courseModel");
const { default: mongoose } = require("mongoose");

module.exports = {
  addViewingActivity: async (req, res) => {
    try {
      const { course, lecture, duration } = req.body;
      const user = req.user._id;
      const courseID = await CourseModel.findOne({ slug: course }).select("_id");
      const viewingActivity = new ViewingActivity({
        user,
        course: courseID._id,
        lecture,
        duration,
      });
      await viewingActivity.save();
      res.status(201).json({ message: "Viewing activity added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCompletedLectures: async (req, res) => {
    try {
      const user = req.user._id;
      const courseID = await CourseModel.findOne({ slug: req.params.course }).select("_id");
      const completedLectures = await ViewingActivity.aggregate([
        {
          $match: {
            user: user,
            course: courseID._id,
          },
        },
        {
          $group: {
            _id: {
              user: "$user",
              course: "$course",
              lecture: "$lecture",
            },
            doc: {
              $first: "$$ROOT",
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: "$doc",
          },
        },
        {
          $project: {
            lecture: 1,
          },
        },
      ]);
      const courseList = completedLectures.map((lecture) => lecture.lecture);
      res.json(courseList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWeeklyWatchtime: async (req, res) => {
    try {
      const user = req.user._id;
      const weeklyWatchtime = await ViewingActivity.find({
        user: user,
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          $lt: new Date(), // Now
        },
      }).select("duration");
      const weeklyWatchtimeSeconds = weeklyWatchtime.reduce((acc, cur) => acc + cur.duration, 0);
      const weeklyWatchtimeMinutes = (weeklyWatchtimeSeconds / 60).toFixed(0);
      res.json(weeklyWatchtimeMinutes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
