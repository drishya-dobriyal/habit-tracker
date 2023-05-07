const Habit = require("../models/habit");
const Tracker = require("../models/tracker");

const { parseDetails, getTrackStatus } = require("./utils");

/* controller for home */
module.exports.home = async function (req, res) {
  let totalHabits = await Habit.find({}).populate("tracking");
  /* get habits details */
  totalHabits = totalHabits.map(parseDetails);
  return res.render("home", {
    title: "Habit Tracker",
    totalHabits,
  });
};

/* add new habit controller */
module.exports.addNewHabit = async function (req, res) {
  const title = req.body.title;
  const habit = await Habit.create({
    title,
    tracking: [],
  });
  const totalHabits = await Habit.find({});
  return res.status(200).send({
    status: "success",
    habit,
    totalHabits,
  });
};

/* Update status */
module.exports.updateStatus = async function (req, res) {
  const { id, status, date } = req.body;
  let habit = await Habit.findById(id).populate("tracking");
  const dateList = await habit.tracking;
  const index = await dateList.findIndex((data) => {
    return data.date == date;
  });
  /* If date is not already present in Tracking list  */
  if (index == -1) {
    const dateObj = await Tracker.create({
      date,
      status,
    });
    habit.tracking.push(dateObj._id);
    habit.save();
    return res.status(200).send({
      status: "success",
      id: habit.id,
      status: dateObj.status,
    });
  }
  /* Date is already present in habit tracking - Update the Status */
  const dateObj = await Tracker.findById(dateList[index].id);
  dateObj.status = status;
  await dateObj.save();
  return res.status(200).send({
    status: "success",
    id: habit.id,
    status: dateObj.status,
  });
};

module.exports.detailsPage = async function (req, res) {
  let totalHabits = await Habit.find({}).populate("tracking");
  totalHabits = totalHabits.map((habit) => {
    const lastWeekDetails = getTrackStatus(7, habit.tracking, habit.createdAt);
    return {
      title: habit.title,
      id: habit.id,
      tracking: lastWeekDetails,
    };
  });
  res.render("details", {
    title: "Detail",
    totalHabits,
  });
};
