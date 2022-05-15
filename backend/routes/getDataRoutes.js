const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const Student = require("../models/studentModel");

const router = express.Router();

var BSIT33 = mongoose.model(
  "BSIT33",
  new Schema({ Name: { type: String } }, { collection: "accounts" })
);

router.route("/renData").get(function (req, res) {
  BSIT33.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
