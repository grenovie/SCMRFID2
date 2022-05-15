const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const accountSchema = mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    card_number: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    isStudent: { type: Boolean, default: false },
    isStaff: { type: Boolean, default: false },
    present: { type: Number },
  },
  { timestamps: true }
);

accountSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

accountSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
