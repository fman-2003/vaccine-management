const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    minimumTargetAge: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      required: true,
      trim: true,
    },
    routeOfAdministration: {
      type: String,
      required: true,
      trim: true,
    },
    siteOfAdministration: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Vaccine", vaccineSchema);
