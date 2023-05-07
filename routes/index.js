const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);

router.post("/add-new-habit", homeController.addNewHabit);
router.post("/update-status", homeController.updateStatus);

router.get("/details-page", homeController.detailsPage);

module.exports = router;
