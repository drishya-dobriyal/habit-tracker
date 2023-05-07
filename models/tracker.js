const mongoose = require("mongoose");

/* Create Tracking status */
const trackerScehma = new mongoose.Schema({
  date: {
    type: "String",
  },
  status: {
    type: "String",
  },
});

/* Create model for Tracking */
const Tracker = mongoose.model("Tracker", trackerScehma);

module.exports = Tracker;
