const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false, // By default, a prompt is not featured
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: [String], // Array of strings for categorization
    likes: {
      type: Number,
      default: 0, // To track user likes or upvotes
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prompt", promptSchema);
