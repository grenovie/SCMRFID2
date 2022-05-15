const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const professorSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    professorId: { type: String, require: true, unique: true },
    fullName: { type: String, require: true },
    section: { type: String, require: true },
    isStaff: { type: Boolean, default: false },
    lab: { type: String, require: true },
    rfid: { type: String },
    time: { type: String },
    timePresent: { type: String },
  },
  { timestamps: true }
);

professorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

professorSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Professor = mongoose.model("Professor", professorSchema);

module.exports = Professor;
