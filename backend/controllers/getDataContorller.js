const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");

const getDataAbsent = asyncHandler(async (req, res) => {
  const data = await Student.find({
    section: "BSIT-33",
    status: "Absent",
  }).then((data) => res.send(data));
  if (!data) {
    res.status(500);
  } else {
    res.status(200);
  }
});

const changeStatus = asyncHandler(async (req, res) => {
  const { editingStudent, studentId } = req.body;

  const user = await Student.findOne({ studentId });
  const stud = await Student.findByIdAndUpdate(user._id, {
    $set: { status: editingStudent },
  });
  if (!stud) {
    res.status(400);
    throw new Error("Can't Update");
  } else {
    res.json({});
  }
});

module.exports = { getDataAbsent, changeStatus };
