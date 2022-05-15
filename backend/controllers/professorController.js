const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Professor = require("../models/professorModel");

const registerProfessor = asyncHandler(async (req, res) => {
  const { username, password, professorId, fullName, section, isStaff, lab } =
    req.body;

  if (
    !username ||
    !password ||
    !professorId ||
    !fullName ||
    !section ||
    !isStaff ||
    !lab
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
    username,
    password,
    professorId,
    fullName,
    section,
    isStaff,
    lab,
  });

  if (professor) {
    res.status(201).json("Registered");
  } else {
    res.status(400);
    throw new Error("Failed to Create!");
  }
});

module.exports = { registerProfessor };
