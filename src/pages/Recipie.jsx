import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ICON IMPORTS
import favoriteIcon from '../assets/icons/bookmark.png'
import savedIcon from '../assets/icons/saved.png';

// COMPONENTS IMPORTS
import Navbar from "../components/Navbar";
import { readRecipeById } from "../apis/recipes";

function Recipie() {
  // STATES AND VARIABLES
  const { id } = useParams();

  const [savedItem, setSavedItem] = useState(false);
  const [recipe, setRecipe] = useState("");

  // FUNCTIONS
  const getRecipeById = async () => {
    const data = await readRecipeById(id);
    setRecipe(data.meals[0]);
  };

  // useEffect
  useEffect(() => {
    getRecipeById();
  }, []);
  return (
    <>
      <Navbar />
      <div className="sm:flex-nowrap flex flex-wrap m-5">
        <img
          src={recipe.strMealThumb}
          alt="img"
          className="md:w-1/2 p-2 m-2 shadow-lg shadow-green-300"
        />
        <div className="flex flex-col my-5">
          <div className="mx-5 flex justify-between items-center">
            <h1 className="font-bold text-5xl mb-5">{recipe.strMeal}</h1>
            <img
              className="w-7 hover:scale-125"
              src={savedItem ? savedIcon : favoriteIcon}
              alt="icn"
            //   onClick={handleSavedRecipes}
            />
          </div>
          <span className="text-grey font-semibold mx-5">{recipe.strArea}</span>
          <span className="text-green-600 font-bold text-xl mx-5">
            {recipe.strCategory}
          </span>
          <div className="my-10 mx-5">
            <span className="text-xl font-semibold text-green-600">
              Ingredients:
            </span>
            <p>
              {recipe.strIngredient1}, {recipe.strIngredient2},{" "}
              {recipe.strIngredient3}, {recipe.strIngredient4},{" "}
              {recipe.strIngredient5}, {recipe.strIngredient6},{" "}
            </p>
          </div>
          <div className="bg-green-200 rounded-lg p-5">
            <h5 className="font-bold text-xl text-green-600">Instruction: </h5>
            <p className="leading-8">{recipe.strInstructions}</p>
          </div>
          <div className="p-4 border-2 border-green-600 text-white bg-green-600 my-10 font-bold text-center hover:text-green-600 hover:bg-white">
            <a href={recipe.strYoutube}>Recipe Tutorial</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipie;
