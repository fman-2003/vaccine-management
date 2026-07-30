const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
      required: true,
      index: true,
    },
    vaccine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vaccine",
      required: true,
      index: true,
    },
    earliestDate: {
      type: Date,
      required: true,
      index: true,
    },
    dateOfImmunization: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "missed"],
      default: "pending",
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Schedule", scheduleSchema);
