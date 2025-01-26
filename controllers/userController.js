// GET USER INFO

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    user.password = undefined;
    res.status(200).send({ success: true, message: "User Found", user });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error In get User Api", error });
  }
};

const updateUserController = async (req, res) => {
  try {
    // find User
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    //Update
    const { username, address, phone } = req.body;

    if (username) {
      user.username = username;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }

    const savedUser = await user.save();
    res
      .status(200)
      .send({ success: true, message: "User Updated Successfully", savedUser });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error In update User Api", error });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    //Update
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(500)
        .send({ success: false, message: "All Parameter are manadatory!" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Incorrect Old Password",
        oldPassword,
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    const savedUser = await user.save();
    res.status(201).send({
      success: true,
      message: "Password Updated Successfully",
      savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error In update Password Api", error });
  }
};

const resetPasswordController = async () => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "ALL fields to reset passsword is mandaoty",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Found" });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    const savedUser = await user.save();
    res.status(201).send({
      success: true,
      message: "Password Reset Successfully",
      savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error In update Password Api" });
  }
};

const deleteUserController = async (req, res) => {
  try {
    console.log(req);
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "ID has been deleted" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Password API",
      error: error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
