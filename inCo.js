const CourseModel = require("./models/courseModel");
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

  const course = [
    {
      slug: "how-to-perform-a-surgery",
      title: "How to perform a surgery",
      description:
        "This course explains how to perform a surgery. It is important to follow the correct procedure while performing a surgery. This course will help you understand the steps involved in performing a surgery. Watch the course to know more. Later you can take a quiz to test your knowledge. Good luck!",
      thumbnail: "/images/stock-thumbnail-1.jpg",
      lectures: [
        {
          lecture: "668e9d8e2868cb8ba42099b7",
          index: 1,
        },
        {
          lecture: "668e9d8e2868cb8ba42099bc",
          index: 2,
        },
        {
          lecture: "668e9d8e2868cb8ba42099c1",
          index: 3,
        },
      ],
    },
  ];

  try {
    await CourseModel.insertMany(course);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
