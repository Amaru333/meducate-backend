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
      video: {
        url: "/videos/dummy-1.mp4",
        thumbnail: "/",
        duration: 120,
      },
      title: "Difference between a fracture and a sprain",
      description:
        "In this informative video, we delve into the world of common injuries: fractures and sprains. Have you ever wondered how these injuries differ? Join us as we break down the distinctions between fractures, which involve bone breaks ranging from hairline cracks to complete breaks, and sprains, which affect ligaments due to overstretching or tearing. Learn about the symptoms, treatments, and recovery processes for each, and gain valuable insights into how to identify and manage these injuries effectively.",
      questions: [
        {
          timestamp: 10,
          question: "668e9a792d79676881ae39d7",
        },
        {
          timestamp: 40,
          question: "668e9a792d79676881ae39d8",
        },
      ],
    },
    {
      video: {
        url: "/videos/dummy-1.mp4",
        thumbnail: "/",
        duration: 221,
      },
      title: "How inflammation contributes to wound healing",
      description:
        "Inflammation plays a crucial role in the healing process of wounds by initiating and coordinating essential stages of repair. When an injury occurs, inflammation serves to clean the wound site by removing debris and combating potential infections. Understanding the balance and functions of inflammation provides insights into optimizing wound care strategies for faster and more effective healing.",
      questions: [
        {
          timestamp: 22,
          question: "668e9a792d79676881ae39d9",
        },
        {
          timestamp: 36,
          question: "668e9a792d79676881ae39d1",
        },
      ],
    },
    {
      video: {
        url: "/videos/dummy-1.mp4",
        thumbnail: "/",
        duration: 84,
      },
      title: "Common symptoms of a concussion and the importance of rest in recovery",
      description:
        "This video focuses on the clinical aspects of concussions, providing essential insights into their symptoms and the critical role of rest in patient recovery. Concussions, often resulting from head trauma, manifest with symptoms such as headaches, dizziness, cognitive impairment, and sensory sensitivity. We delve into why immediate diagnosis and appropriate management are crucial in mitigating long-term consequences. Understanding the physiological basis of concussion symptoms and the neuroprotective benefits of rest are pivotal in optimizing patient outcomes.",
      questions: [
        {
          timestamp: 22,
          question: "668e9a792d79676881ae39d9",
        },
        {
          timestamp: 36,
          question: "668e9a792d79676881ae39d1",
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
