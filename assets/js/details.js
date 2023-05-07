/* Update status */
const updateStatus = function (habitId, date) {
  let status = event.target.value;
  axios
    .post(`/update-status`, {
      id: habitId,
      status,
      date: date,
    })
    .then(({ data }) => {
      window.location.reload();
    });
};
