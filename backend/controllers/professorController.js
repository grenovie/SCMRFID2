const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Professor = require("../models/professorModel");

const registerProfessor = asyncHandler(async (req, res) => {
  const {
    rfid,
    username,
    password,
    professorId,
    fullName,
    isStaff,
    lab,
    sched,
    timeStart,
    timeEnd,
    section,
    subject,
  } = req.body;

  if (
    !username ||
    !password ||
    !professorId ||
    !fullName ||
    !lab ||
    !rfid ||
    !sched ||
    !timeStart ||
    !timeEnd ||
    !subject
  ) {
    res.status(404);
    throw new Error("Please fill all the fields!");
  }

  const userExists = await Professor.findOne({ professorId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist!");
  }

  const professor = await Professor.create({
    rfid,
    username,
    password,
    professorId,
    fullName,
    isStaff,
    lab,
    timeStart,
    timeEnd,
    sched,
    section,
    subject,
  });

  if (professor) {
    res.status(201).json("Registered");
  } else {
    res.status(400);
    throw new Error("Failed to Create!");
  }
});

module.exports = { registerProfessor };
