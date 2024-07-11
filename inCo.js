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
      slug: "physical-injuries-and-concussion",
      title: "Physical injuries and concussion",
      description:
        "Learn about common physical injuries and the impact of concussions on the brain. Discover how to identify and manage these injuries effectively. Gain insights into the symptoms, treatments, and recovery processes for each. Understand the importance of early intervention and proper care to prevent long-term complications. This course is suitable for healthcare professionals, athletes, coaches, and anyone interested in injury prevention and management. Enroll now to enhance your knowledge and skills in this critical area of healthcare.",
      thumbnail: "/images/stock-thumbnail-1.jpg",
      lectures: [
        {
          lecture: "668fd4b8c2246a9807ed4a3a",
          index: 1,
        },
        {
          lecture: "668fd4b8c2246a9807ed4a3e",
          index: 2,
        },
        {
          lecture: "668fd4b8c2246a9807ed4a42",
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
