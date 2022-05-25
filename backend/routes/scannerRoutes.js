const express = require("express");
const {
  addPresent,
  addPresentBackup,
  triggerButton,
} = require("../controllers/scannerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/add").put(addPresent);
router.route("/add_backup").put(addPresentBackup);
router.route("/trigger_btn").put(triggerButton);
module.exports = router;
