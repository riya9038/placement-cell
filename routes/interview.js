const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");
router.post("/create", interviewController.create);
router.get("/newInterview", interviewController.newInterview);
module.exports = router;