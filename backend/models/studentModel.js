const mongoose = require("mongoose");
const studentSchema = mongoose.Schema(
  {
    rfid: { type: String, require: true },
    section: { type: String, require: true },
    firstName: { type: String, require: true },
    surName: { type: String, require: true },
    midName: { type: String, require: true },
    gender: { type: String, require: true },
    program: { type: String, require: true },
    email: { type: String, require: true },
    address: { type: String, require: true },
    studentId: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    present: { type: Number },
    status: { type: Boolean, default: false },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
