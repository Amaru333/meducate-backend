const mongoose = require("mongoose");

const viewingActivity = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture", required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ViewingActivity", viewingActivity);
