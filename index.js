const express = require("express");
const bodyParser = require("body-parser");
const Router = express.Router();
const app = express();
const db = require("./config/mongoose");
const PORT = 8000;

/* Middleware for Parsing req body */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Use ejs as view */
app.set("view engine", "ejs");
app.set("views", "./views");

/* Use assets as public folder */
app.use(express.static("./assets"));

/* Route to Routes */
app.use("/", require("./routes"));

/* make app listen to port */
app.listen(PORT, (err) => {
  if (err) console.log(`Error in Runnning APP: ${err}`);
  console.log(`App Listening at PORT: ${PORT}`);
});
