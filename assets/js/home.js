/* Toggle status */
const toggleStatus = function () {
  const ele = event.target;
  const habitId = event.target.parentElement.parentElement.id;
  let currColor = ele.style.backgroundColor;
  let status = "fullfilled";
  if (currColor == "green") {
    status = "unfullfilled";
  }
  axios
    .post(`/update-status`, {
      id: habitId,
      status,
      date: new Date().toLocaleDateString("en-GB"),
    })
    .then(({ data }) => {
      window.location.reload();
    });
};

/* add new habit */
const addNewHabit = function () {
  const title = document.querySelectorAll("header input")[0].value;
  if (!title) return;
  axios
    .post(`/add-new-habit`, {
      title,
    })
    .then((res) => {
      window.location.reload();
    });
};

/* Event Handler for adding title */
const handleTitle = function (e) {
  if (e.key == "Enter") {
    addNewHabit();
  }
};

/* Add event handler for adding title */
document
  .querySelectorAll("header input")[0]
  .addEventListener("keypress", handleTitle);
