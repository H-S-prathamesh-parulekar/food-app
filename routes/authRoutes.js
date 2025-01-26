const express = require("express");
const {
  registerContoller,
  loginController,
} = require("../controllers/authController");

const router = express.Router();
//routes

//REGISTER || POST

router.post("/register", registerContoller);

//LOGIN || POST

router.post("/login", loginController);

module.exports = router;
