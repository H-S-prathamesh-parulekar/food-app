const mongoose = require("mongoose");

// Schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "Food description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    category: { 
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: { 
      type: Boolean,
      default: true,
    },
    restaurant: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", 
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number, 
    },
  },
  { timestamps: true }
);

// Export
module.exports = mongoose.model("Foods", foodSchema);
