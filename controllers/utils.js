/* Parse Details From habit */
module.exports.parseDetails = (habit) => {
  /* Calculate total days  */
  let createAt = new Date(habit.createdAt);
  createAt.setHours(0, 0, 0, 0);
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let totalDays = Math.ceil(
    (today.getTime() - createAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (totalDays < 1) totalDays = 1;

  /* Calculate Days for fulfilled or unfulfilled */
  let count_fullfilled = 0;
  let count_unfullfilled = 0;
  let todayStatus = "none";
  habit.tracking.forEach((data) => {
    if (data.status == "unfullfilled") count_unfullfilled += 1;
    if (data.status == "fullfilled") count_fullfilled += 1;
    if (data.date == new Date().toLocaleDateString("en-GB")) {
      todayStatus = data.status;
    }
  });

  return {
    title: habit.title,
    count_fullfilled,
    count_unfullfilled,
    totalDays,
    id: habit.id,
    todayStatus,
  };
};

/* Get details of status */
module.exports.getTrackStatus = function (count, list, upto) {
  let dateObj = {};
  for (let data of list) {
    dateObj[data.date] = data.status;
  }
  let curr = new Date();
  let i = 0;
  let result = [];
  while (i < count) {
    let dateStr = curr.toLocaleDateString("en-GB");
    let status = dateObj[dateStr] ? dateObj[dateStr] : "none";
    result.push({ date: dateStr, status });
    if (new Date(upto).toLocaleDateString("en-GB") == dateStr) break;
    curr.setDate(curr.getDate() - 1);
    i++;
  }
  return result;
};
