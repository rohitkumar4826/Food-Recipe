const router = require("express").Router();
const Recipe = require("../models/Recipe");

router.post("/add_recipe", async (req, res) => {
  console.log("Received Recipe request", req.body.dish);
  const existingDish = await Recipe.findOne({ dish: req.body.dish });
  if (existingDish) {
    return res
      .status(400)
      .json({ message: "Dish already exists by this name!" });
  }

  const newDish = new Recipe({
    dish: req.body.dish,
    ingredients: req.body.ingredients,
    instruction: req.body.instruction,
    time: req.body.time,
    img_url: req.body.img_url,
    video_url: req.body.video_url,
  });

  try {
    const savedDish = await newDish.save();
    res.status(200).json(savedDish);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CRUD operation for recipe

router.post("/recipe", async (req, res) => {
  try {
    const recipe = await Recipe.find({});
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read a single recipe by ID
router.post("/find/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipe", error: err });
  }
});

// Update a recipe by ID
router.post("/update/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe", error: err });
  }
});

// Delete a recipe by ID
router.post("/delete/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe", error: err });
  }
});

module.exports = router;
