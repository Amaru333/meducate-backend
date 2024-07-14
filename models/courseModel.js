const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    certificateData: { type: String, required: true },
    lectures: {
      type: [
        {
          lecture: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture", required: true },
          index: { type: Number, required: true },
        },
      ],
      required: true,
    },
    tag: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
