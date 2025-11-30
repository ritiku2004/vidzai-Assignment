// models/Topic.js
const mongoose = require("mongoose");

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image"],
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const topicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    // Title image used only on the topic list
    image: { type: String },

    // Explanation blocks for detail page
    content: { type: [contentBlockSchema], default: [] },

    questions: [
      {
        text: String,
        options: [String],
        answer: Number
      }
    ],

    starsEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
