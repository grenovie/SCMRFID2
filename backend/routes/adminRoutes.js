const express = require("express");
const { route } = require("express/lib/application");
const { registerStudent } = require("../controllers/studentController");
const { registerProfessor } = require ("../controllers/professorController")

const router = express.Router();

router.route("/register").post(registerStudent);
router.route("/reg_professor").post(registerProfessor);

module.exports = router;
