const express= require('express');
const router= express.Router();
const userController= require('../controllers/userController');
router.get("/", userController.signUp);
router.use("/user", require("./user"))
router.use("/student", require("./student"))
router.use("/interview", require("./interview"))
module.exports= router;