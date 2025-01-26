const mongoose = require("mongoose");

// Create Schema
const coordinateSchema = mongoose.Schema({
  id: { type: String },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitudeDelta: { type: Number, default: 0 },
  latitudeDelta: { type: Number, default: 0 },
  title: { type: String },
});

const restaurantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    imageUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1376/1376387.png",
    },
    foods: { type: Array },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1376/1376387.png",
    },
    rating: {
      type: Number,
      default: 1,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
      trim: true, 
    },
    coordinates: coordinateSchema,
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.model("Restaurant", restaurantSchema);
