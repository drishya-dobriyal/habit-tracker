const mongoose = require("mongoose");
const Tracker = require("./tracker");

/* Habit schema */
const habitSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    tracking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tracker" }],
  },
  { timestamps: true }
);

/* Create model for habit */
const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
