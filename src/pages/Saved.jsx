import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";

function Saved() {
  // STATES AND VARIABLES
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || []);

  // FUNCTIONS
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

  // useEffect
  useEffect(() => {
    localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
    console.log(savedRecipe);
  }, [savedRecipe]);

  useEffect(() => {
    setSavedRecipe(JSON.parse(localStorage.getItem("savedRecipe")) || []);
    console.log(savedRecipe);
  }, []);

  return (
    <>
      <Navbar />
      <div></div>
      <h1 className="font-semibold text-3xl m-5 text-center">
        Saved Recipes...
      </h1>
      <div className="flex flex-wrap justify-start items-center p-2 px-0 sm:px-20 bg-green-200">
        {savedRecipe.length >  0 ?
          savedRecipe.map((item) => (
            <RecipeCard
              key={item.idMeal}
              {...item}
              handleSavedRecipes={handleSavedRecipes}
            />
          )) : <div> Explore more. Go to Home Page</div>}
      </div>
    </>
  );
}

export default Saved;
