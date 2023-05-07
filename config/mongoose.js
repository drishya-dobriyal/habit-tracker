const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/project");

const db = mongoose.connection;

db.on("error", console.error.bind(console, `Error - Connecting to mongodb`));

db.once("open", () => {
  console.log("Success - Connected to Database - Mongodb");
});
