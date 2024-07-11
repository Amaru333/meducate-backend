const Lecture = require("../models/lectureModel");
const Question = require("../models/questionModel");
const CourseModel = require("../models/courseModel");

module.exports = {
  getLectures: async (req, res) => {
    try {
      const lecture = await Lecture.findById(req.params.id).populate({
        path: "questions.question",
        model: Question,
      });
      res.json(lecture);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCourseLectures: async (req, res) => {
    try {
      //   console.log(req.params.slug, "SLUG");
      const course = await CourseModel.findOne({ slug: req.params.slug }).select("lectures").populate({
        path: "lectures.lecture",
        model: Lecture,
      });
      //   console.log(course, "COURSE");
      const sortedLectures = course.lectures.sort((a, b) => a.index - b.index);
      res.json(sortedLectures);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
