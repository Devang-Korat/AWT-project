const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description max 200 characters"],
    },

    image: {
      type: String,
      default: null
    },
    
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Category", categorySchema);