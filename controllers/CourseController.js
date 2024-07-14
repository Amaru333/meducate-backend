const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/courseModel");
const UserModel = require("../models/userModel");
const Lecture = require("../models/lectureModel");
const ViewingActivity = require("../models/viewingActivityModel");
const CertificateModel = require("../models/certificateModel");

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

  getRecommendedCourses: async (req, res) => {
    try {
      const courses = await CourseModel.find().populate({
        path: "lectures.lecture",
        model: Lecture,
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getIndividualCourse: async (req, res) => {
    try {
      const course = await CourseModel.findOne({ slug: req.params.slug }).populate({
        path: "lectures.lecture",
        model: Lecture,
      });
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRecentlyWatchedCourse: async (req, res) => {
    try {
      const user = req.user._id;
      const recentlyWatchedCourseArray = await ViewingActivity.find({ user: user }).sort({ createdAt: -1 }).limit(1);
      const recentlyWatchedCourse = recentlyWatchedCourseArray[0];
      const courseDetails = await CourseModel.findById(recentlyWatchedCourse.course)
        .populate({
          path: "lectures.lecture",
          model: Lecture,
        })
        .select("title slug lectures description");
      if (!recentlyWatchedCourse) res.status(404).json({ message: "No recently watched course" });
      const completedLectures = await ViewingActivity.aggregate([
        {
          $match: {
            user: user,
            course: new mongoose.Types.ObjectId(recentlyWatchedCourse.course),
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
      const completedLecturesList = completedLectures.map((lecture) => lecture.lecture);
      const progress = ((completedLecturesList.length * 100) / courseDetails.lectures.length).toFixed(2);
      const lectureList = courseDetails.lectures;
      const recentlyWatchedLectureIndex = lectureList.filter((lecture) => {
        return lecture.lecture._id.toString() == recentlyWatchedCourse.lecture.toString();
      })[0].index;
      const nextLecture = recentlyWatchedLectureIndex >= lectureList.length ? lectureList.filter((lecture) => lecture.index == recentlyWatchedLectureIndex)[0] : lectureList.filter((lecture) => lecture.index == recentlyWatchedLectureIndex + 1)[0];
      // const firstLecture = lectureList.filter((lecture) => lecture.index == 1)[0];
      res.json({
        title: courseDetails.title,
        slug: courseDetails.slug,
        description: courseDetails.description,
        progress: progress,
        lectureToWatch: nextLecture,
        // firstLecture: firstLecture
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  finishedCourse: async (req, res) => {
    try {
      const user = req.user._id;
      // const course = req.body.course;
      const courseData = await CourseModel.findOne({ slug: req.body.course });
      const isCertificatePresent = await CertificateModel.findOne({ user: user, course: courseData._id });
      if (isCertificatePresent) {
        return res.status(400).json({ message: "Certificate already generated" });
      }
      // const courseData = await CourseModel.findById(course);
      const description = courseData.certificateData;
      const newCertificate = new CertificateModel({
        user: user,
        course: courseData._id,
        description: description,
      });
      await newCertificate.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCertificates: async (req, res) => {
    try {
      const user = req.user._id;
      const certificates = await CertificateModel.find({ user: user })
        .populate({
          path: "course",
          model: CourseModel,
        })
        .populate({
          path: "user",
          model: UserModel,
        });
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getIndividualCertificate: async (req, res) => {
    try {
      const certificate = await CertificateModel.findById(req.params.id)
        .populate({
          path: "course",
          model: CourseModel,
        })
        .populate({
          path: "user",
          model: UserModel,
        });
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
