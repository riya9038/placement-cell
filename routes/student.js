const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
router.post("/create", studentController.create);
router.get("/newStudent", studentController.newStudent);
module.exports = router;