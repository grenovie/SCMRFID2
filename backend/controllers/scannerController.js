const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");

const addPresent = asyncHandler(async (req, res) => {
  const { rfid } = req.body;
  const user = await Student.findOne({ rfid });
  const added = await Student.findByIdAndUpdate(user._id, {
    $inc: { present: 1 },
    $set: { status: true },
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
});
const addPresentBackup = asyncHandler(async (req, res) => {
  const { studentId, password } = req.body;
  const user = await Student.findOne({ studentId });
  if (user.password != password) {
    res.status(400);
    throw new Error("Bad Password");
  } else {
    const added = await Student.findByIdAndUpdate(user._id, {
      $inc: { present: 1 },
      $set: { status: true },
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

module.exports = { addPresent, addPresentBackup };
