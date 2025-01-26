const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllResturantController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/restaurantControllers");

const router = express.Router();
//routes

// CREATE  || POST
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", getAllResturantController);

// GET RESTURANT BY ID || GET
router.get("/get/:id", getResturantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
