const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    exposedHeaders: "auth-token",
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3004, () => {
      console.log("Server has started");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const userRoutes = require("./routes/User");
app.use("/api/user", userRoutes);

const courseRoutes = require("./routes/Course");
app.use("/api/course", courseRoutes);

const lectureRoutes = require("./routes/Lecture");
app.use("/api/lecture", lectureRoutes);

const activityRoutes = require("./routes/Activity");
app.use("/api/activity", activityRoutes);
