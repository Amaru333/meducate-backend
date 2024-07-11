const LectureModel = require("./models/lectureModel");
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
const insertData = async () => {
  await connectDB();

  const newLectures = [
    {
      videoURL: "/videos/dummy-1.mp4",
      title: "Items required for a surgery",
      description: "This video explains the items required for a surgery. It is important to have all the necessary items ready before starting a surgery. This video will help you understand the importance of each item. Watch the video to know more.",
      questions: [
        {
          timestamp: 10,
          question: "668e9a792d79676881ae39cb",
        },
        {
          timestamp: 20,
          question: "668e9a792d79676881ae39cc",
        },
        {
          timestamp: 30,
          question: "668e9a792d79676881ae39cd",
        },
        {
          timestamp: 40,
          question: "668e9a792d79676881ae39ce",
        },
      ],
    },
    {
      videoURL: "/videos/dummy-1.mp4",
      title: "How to perform a surgery",
      description: "This video explains how to perform a surgery. It is important to follow the correct procedure while performing a surgery. This video will help you understand the steps involved in performing a surgery. Watch the video to know more.",
      questions: [
        {
          timestamp: 10,
          question: "668e9a792d79676881ae39cf",
        },
        {
          timestamp: 20,
          question: "668e9a792d79676881ae39d0",
        },
        {
          timestamp: 30,
          question: "668e9a792d79676881ae39d1",
        },
        {
          timestamp: 40,
          question: "668e9a792d79676881ae39d2",
        },
      ],
    },
    {
      videoURL: "/videos/dummy-1.mp4",
      title: "How to use a stethoscope",
      description: "This video explains how to use a stethoscope. It is important to know how to use a stethoscope correctly to get accurate readings. This video will help you understand the correct way to use a stethoscope. Watch the video to know more.",
      questions: [
        {
          timestamp: 10,
          question: "668e9a792d79676881ae39d3",
        },
        {
          timestamp: 20,
          question: "668e9a792d79676881ae39d4",
        },
        {
          timestamp: 30,
          question: "668e9a792d79676881ae39d5",
        },
        {
          timestamp: 40,
          question: "668e9a792d79676881ae39d6",
        },
      ],
    },
  ];

  try {
    await LectureModel.insertMany(newLectures);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
