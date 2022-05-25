const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const Professor = require("../models/professorModel");
const addPresent = asyncHandler(async (req, res) => {
  const { rfid, time, timePresent, roomNum, subject, professor } = req.body;
  const user = await Student.findOne({ rfid });
  const added = await Student.findByIdAndUpdate(user._id, {
    $inc: { present: 1 },
    $set: {
      status: "Present",
      time: time,
      timePresent: timePresent,
      roomNum: roomNum,
      subject: subject,
      professor: professor,
    },
  });

  if (!added) {
    res.status(400);
    throw new Error("Can't Update");
  } else {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      surName: user.surName,
      midName: user.midName,
      section: user.section,
      pic: user.pic,
      studentId: user.studentId,
      time: user.time,
    });
  }
});
const addPresentBackup = asyncHandler(async (req, res) => {
  const {
    studentId,
    password,
    time,
    timePresent,
    roomNum,
    subject,
    professor,
  } = req.body;
  const user = await Student.findOne({ studentId });
  if (user.password != password) {
    res.status(400);
    throw new Error("Bad Password");
  } else {
    const added = await Student.findByIdAndUpdate(user._id, {
      $inc: { present: 1 },
      $set: {
        status: "Present",
        time: time,
        timePresent: timePresent,
        roomNum: roomNum,
        subject: subject,
        professor: professor,
      },
    });

    if (!added) {
      res.status(400);
      throw new Error("Can't Update");
    } else {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        surName: user.surName,
        midName: user.midName,
        section: user.section,
        pic: user.pic,
        studentId: user.studentId,
      });
    }
  }
});

const triggerButton = asyncHandler(async (req, res) => {
  const { professorId, section } = req.body;

  const user = await Professor.findOne({ professorId });
  const added = await Professor.findByIdAndUpdate(user._id, {
    $set: { section: section },
  });
  if (!added) {
    res.status(400);
    throw new Error("Can't Update");
  } else {
    res.json({
      professorId: user.professorId,
      section: user.section,
    });
  }
});
module.exports = { addPresent, addPresentBackup, triggerButton };
