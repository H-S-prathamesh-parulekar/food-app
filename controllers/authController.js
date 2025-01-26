const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
//REGISTER
const registerContoller = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      address,
      phone,
      usertype,
      profile,
      answer,
    } = req.body;
    //validation
    if (!username || !email || !password || !address || !phone || !answer) {
      return res
        .status(500)
        .send({ success: false, message: "All fields are manadatory!" });
    }
    //check existing User
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res
        .status(500)
        .send({ success: false, message: "User already exist!", existing });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      usertype,
      profile,
      answer,
    });
    res
      .status(201)
      .send({ success: true, message: "User Successfully Registered", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR IN REGISTER API",
      error,
    });
  }
};

// LOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(500)
        .send({ success: false, message: "All Parameter Is Manadatory" });
    }

    // check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found.",
      });
    }

    // check username || compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(500)
        .send({ success: false, message: "Incorrect Password", password });
    }

    // Create Token

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECREAT, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res
      .status(200)
      .send({ status: true, message: "Login Succesfully", token, user });

    //validation
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error In Login API", error });
  }
};

module.exports = { registerContoller, loginController };
