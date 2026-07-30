const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    weightAtBirth: {
      type: Number,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Child", childSchema);
