const mongoose = require("mongoose");

//create Schema

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "USERNAME IS REQUIRED"],
    },
    email: {
      type: String,
      required: [true, "EMAIL IS REQUIRED"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "PASSWORD IS REQUIRED"],
    },
    address: {
      type: Array,
    },
    phone: { type: String, required: [true, "PHONE IS REQUIRED"] },
    usertype: {
      type: String,
      required: [true, "USER TYPE IS REQUIRED"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    },
    answer: {
      type: String,
      required: [true, "Answer Is Required"],
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
