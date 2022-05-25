const express = require("express");
const {
  registerAccount,
  authUser,
  authAdmin,
  authStudent,
  authUser2,
} = require("../controllers/accountController");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerAccount);
router.post("/login", authUser);
router.post("/login_credential", authUser2);
router.post("/admin", authAdmin);
module.exports = router;
