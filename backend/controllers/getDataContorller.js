const asyncHandler = require("express-async-handler");
const BSIT33 = require("../models/studentModel");
const mongoose = require("mongoose");

const getData = asyncHandler(async (req, res) => {
  try {
    Students.find().then((data) => res.send(data));
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = { getData };
