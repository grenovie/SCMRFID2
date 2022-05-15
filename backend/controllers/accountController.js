const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const { compileETag } = require("express/lib/utils");
const generateToken = require("../config/generateToken");
const Account = require("../models/accountModel");
const Professor = require("../models/professorModel");

const registerAccount = asyncHandler(async (req, res) => {
  const { username, password, isAdmin, card_number, isStudent, isStaff } =
    req.body;

  if (
    !username ||
    !password ||
    !isAdmin ||
    !card_number ||
    !isStaff ||
    !isStudent
  ) {
    res.status(404);
    throw new Error("Please fill all the fields!");
  }

  const userExists = await Account.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist!");
  }

  const user = await Account.create({
    username,
    password,
    isAdmin,
    isStaff,
    isStudent,
    card_number,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      isStaff: user.isStaff,
      isStudent: user.isStudent,
      card_number: user.card_number,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create!");
  }
});

const authUser2 = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const professor = await Professor.findOne({ username });

  if (await professor.matchPassword(password)) {
    res.json({
      _id: professor._id,
      fullName: professor.fullName,
      section: professor.section,
      isStaff: professor.isStaff,
      token: generateToken(professor._id),
    });
  } else {
    res.status(401);
    throw new Error("You are not allowed here");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { rfid } = req.body;

  const professor = await Professor.findOne({ rfid });
  if (professor.rfid) {
    res.json({
      _id: professor._id,
      fullName: professor.fullName,
      section: professor.section,
      isStaff: professor.isStaff,
      token: generateToken(professor._id),
    });
  } else {
    res.status(401);
    throw new Error("You are not allowed here");
  }
});
const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await Account.findOne({ username });

  if (user.isAdmin === true && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      isStudent: user.isStudent,
      isStaff: user.isStaff,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("You are not Admin");
  }
});
const authStudent = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await Account.findOne({ username });
  console.log(user.isStudent);
  if (user.isStudent === true && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,

      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("You are not Student");
  }
});

module.exports = {
  registerAccount,
  authUser,
  authAdmin,
  authStudent,
  authUser2,
};
