const mongoose = require("mongoose");
const RecipeSchema = new mongoose.Schema(
  {
    dish: { type: String, required: true, unique: true },
    ingredients: { type: String, required: true },
    instruction: { type: String, required: true },
    time: { type: String, required: true },
    img_url: { type: String, required: true },
    video_url: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
