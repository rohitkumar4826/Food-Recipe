import { useEffect, useState } from "react";

// apis imports
import {
  readAllRecipes,
  readRecipeByCategory,
  readSearchRecpie,
} from "../apis/recipes";

// icon and images imports
import breakfastIcon from "../assets/icons/breakfast.png";
import lunchIcon from "../assets/icons/lunch.png";
import vegitarianIcon from "../assets/icons/vegetable.png";
import dessertIcon from "../assets/icons/dessert.png";

// components imports
import Navbar from "../components/Navbar";
import HomeBanner from "../components/HomeBanner";
import CategoriesChip from "../components/CategoriesChip";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";
import Input from "../components/Input";
import PrimaryBtn from "../components/PrimaryBtn";

function Home() {
  //STATES AND VARIABLES
  const [recipes, setRecipies] = useState("");
  const [savedRecipe, setSavedRecipe] = useState(
    JSON.parse(localStorage.getItem("savedRecipe")) || []
  );

  //FUNCTION
  function isPresent(recipe) {
    for (const value in savedRecipe) {
      if (savedRecipe[value].idMeal === recipe.idMeal) {
        return true;
      }
    }
    return false;
  }

  const handleSavedRecipes = (recipe) => {
    if (isPresent(recipe)) {
      setSavedRecipe(savedRecipe.filter((e) => e.idMeal !== recipe.idMeal));
    } else {
      setSavedRecipe([...savedRecipe, recipe]);
    }
  };

  const getRecipes = async () => {
    const data = await readAllRecipes();
    console.log("This is the fetched data from api", data);
    setRecipies(data);
  };

  const searchRecipes = async (e) => {
    const data = await readSearchRecpie(e.target.value);
    setRecipies(data);
  };

  const getRecipesByCategory = async (category) => {
    const data = await readRecipeByCategory(category);
    setRecipies(data);
  };

  // useEffect
  useEffect(() => {
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
    console.log(savedRecipe);
  }, [savedRecipe]);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Navbar />
      <HomeBanner />
      <section className="text-center my-5">
        <h1 className="font-semibold text-4xl my-10">
          Recipes <span className="text-green">Categories...</span>
        </h1>
        <div className="flex flex-row justify-evenly items-center">
          <CategoriesChip
            icon={breakfastIcon}
            title="Breakfast"
            handleClick={getRecipesByCategory}
          />
          <CategoriesChip
            icon={lunchIcon}
            title="Starter"
            handleClick={getRecipesByCategory}
          />
          <CategoriesChip
            icon={vegitarianIcon}
            title="Vegetarian"
            handleClick={getRecipesByCategory}
          />
          <CategoriesChip
            icon={dessertIcon}
            title="Dessert"
            handleClick={getRecipesByCategory}
          />
        </div>
      </section>
      <section className="px-0 sm:px-20 bg-lightGreen">
        <div className="flex flex-row justify-between items-center ">
          <h1 className="font-semibold text-3xl m-5">
            Latest <span className="text-green">Recipes...</span>
          </h1>
          <div className="flex mx-4">
            <Input
              type="text"
              placeholder="Search Recipes..."
              handleChange={searchRecipes}
            />
            <PrimaryBtn title="All Recipes" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          {recipes.meals !== null && recipes.meals !== undefined && recipes ? (
            recipes.meals.map((item) => (
              <RecipeCard
                key={item.idMeal}
                {...item}
                handleSavedRecipes={handleSavedRecipes}
              />
            ))
          ) : (
            <div>Please Search Something Else ...</div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
