const express = require("express");
const {
  addPresent,
  addPresentBackup,
} = require("../controllers/scannerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/add").put(addPresent);
router.route("/add_backup").put(addPresentBackup);
module.exports = router;
