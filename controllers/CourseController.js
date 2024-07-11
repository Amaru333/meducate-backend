const CourseModel = require("../models/courseModel");
const Lecture = require("../models/lectureModel");

module.exports = {
  getUserCourses: async (req, res) => {
    try {
      const courses = await CourseModel.find().populate({
        path: "lectures.lecture",
        model: Lecture,
        // populate: {
        //   path: 'questions.question',
        //   model: 'Question',
        // },
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTrendingCourses: async (req, res) => {
    try {
      //   const courses = await CourseModel.find().sort({ rating: -1 }).limit(5);
      const courses = await CourseModel.find().populate({
        path: "lectures.lecture",
        model: Lecture,
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
