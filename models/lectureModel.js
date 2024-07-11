const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    video: {
      type: {
        url: { type: String, required: true },
        thumbnail: { type: String, required: true },
        duration: { type: Number, required: true },
      },
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: {
      type: [
        {
          timestamp: { type: Number, required: true },
          question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lecture", lectureSchema);
