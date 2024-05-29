import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// ICONS IMPORTS
import timeIcon from "../assets/icons/time.png";
import favoriteIcon from "../assets/icons/bookmark.png";
import savedIcon from "../assets/icons/saved.png";

import { getServingTime } from "../utils/getTime";

function RecipeCard({ idMeal, strMeal, strMealThumb, handleSavedRecipes }) {
  // STATES AND VARIABLE
  const time = getServingTime();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(
    (JSON.parse(localStorage.getItem("savedRecipe")) || []).find(
      (saved) => saved.idMeal === idMeal
    )
  );
  const [checkToken, setToken] = useState(
    JSON.parse(localStorage.getItem("accessToken")) || []
  );
  // FUNCTIONS
  const toggleSavedRecipes = () => {
    if (checkToken === null) {
      // Redirect to the login page if checkToken is not present
      navigate("/register");
      return;
    }

    handleSavedRecipes({ idMeal, strMeal, strMealThumb });
    setIsSaved(!isSaved);
  };

  const handleClickOnRecipe = () => {
    if (checkToken === null) {
      navigate("/register");
      return;
    } else {
      navigate(`/recipe/${idMeal}`);
    }
  };

  useEffect(() => {
    const verify = localStorage.getItem("accessToken");
    setToken(verify);
    console.log(checkToken);
  }, []);

  return (
    <div className="w-2/5 items-center sm:w-52 m-5 p-5 bg-green-100 rounded-lg cursor-pointer self-start relative">
      <img
        className="absolute w-6 z-10 right-5 hover:scale-125"
        src={isSaved ? savedIcon : favoriteIcon}
        alt="icn"
        onClick={toggleSavedRecipes}
      />
      <div className="combined relative">
        <img
          className="rounded-sm  hover:opacity-70 "
          src={strMealThumb}
          alt="img"
          onClick={handleClickOnRecipe}
        />
        <div className="child:my-1">
          <h4 className="font-bold hover:underline truncate">{strMeal}</h4>
          <div className="flex justify-between items-center">
            <span className="flex justify-between items-center text-xs text-green font-bold">
              <img className="w-4 mr-0.5" src={timeIcon} alt="icon" />
              {time}min
            </span>
            <button
              className="text-sm text-green hover:underline font-semibold"
              onClick={handleClickOnRecipe}
            >
              View detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
RecipeCard.propTypes = {
  idMeal: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  handleSavedRecipes: PropTypes.func.isRequired,
};

export default RecipeCard;
