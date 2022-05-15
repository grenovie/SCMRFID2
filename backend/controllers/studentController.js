const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Student = require("../models/studentModel");

const registerStudent = asyncHandler(async (req, res) => {
  const {
    rfid,
    studentId,
    section,
    firstName,
    surName,
    midName,
    gender,
    program,
    email,
    address,
    present,
    pic,
    status,
    password,
  } = req.body;

  if (
    !rfid ||
    !studentId ||
    !section ||
    !firstName ||
    !surName ||
    !midName ||
    !gender ||
    !program ||
    !email ||
    !address ||
    !password
  ) {
    res.status(404);
    throw new Error("Please fill all the fields!");
  }

  const userExists = await Student.findOne({ studentId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist!");
  }

  const student = await Student.create({
    rfid,
    studentId,
    section,
    firstName,
    surName,
    midName,
    gender,
    program,
    email,
    address,
    present,
    pic,
    status,
    password,
  });

  if (student) {
    res.status(201).json("Registered");
  } else {
    res.status(400);
    throw new Error("Failed to Create!");
  }
});

module.exports = { registerStudent };
