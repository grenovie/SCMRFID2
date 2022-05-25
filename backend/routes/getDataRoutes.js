const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const {
  getDataAbsent,
  changeStatus,
} = require("../controllers/getDataContorller");
const Student = require("../models/studentModel");

const router = express.Router();

var BSIT33 = mongoose.model(
  "BSIT33",
  new Schema({ Name: { type: String } }, { collection: "BSIT33" })
);
var Logs = mongoose.model(
  "Logs",
  new Schema({ Name: { type: String } }, { collection: "daily_log" })
);

router.route("/renDataBSIT33").get(function (req, res) {
  BSIT33.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
router.route("/renDataAdmin").get(function (req, res) {
  Logs.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
router.route("/renDataAbsent").get(getDataAbsent);
router.route("/changeStatus").put(changeStatus);
module.exports = router;
