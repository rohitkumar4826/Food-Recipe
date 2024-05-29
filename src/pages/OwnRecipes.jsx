import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

function OwnRecipe() {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from localStorage or from the server
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes from localStorage
        const recipeList = JSON.parse(localStorage.getItem("recipes")) || [];

        // If no recipes in localStorage, fetch from the server
        if (recipeList.length === 0) {
          const response = await axios.post(
            "http://localhost:5001/api/user/recipe"
          );
          console.log(
            "This message is received from the Recipe",
            response.message
          );
          localStorage.setItem("recipes", JSON.stringify(response.data));
          setRecipes(response.data);
        } else {
          const response = await axios.post(
            "http://localhost:5001/api/user/recipe"
          );
          console.log(
            "This message is received from the Recipe",
            response.message
          );
          localStorage.setItem("recipes", JSON.stringify(response.data));
          setRecipes(response.data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchRecipes();
  }, []);

  // Delete the recipe by id
  const handleDelete = async (id) => {
    try {
      // Filter out the deleted recipe and update state
      const newRecipes = recipes.filter((recipe) => recipe._id !== id);
      setRecipes(newRecipes);

      // Update localStorage
      localStorage.setItem("recipes", JSON.stringify(newRecipes));

      // Delete recipe from the server
      const response = await axios.post(
        `http://localhost:5001/api/user/delete/${id}`
      );
      console.log("Recipe deleted:", response);
    } catch (err) {
      console.log("Error while deleting recipe", err.response);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="font-semibold text-3xl m-5 text-center">
        Your Own Recipes...
      </h1>
      <div className="flex flex-wrap justify-start items-center p-2 px-0 sm:px-20 bg-green-200">
        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img className="w-full" src={recipe.img_url} alt={recipe.dish} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{recipe.dish}</div>
                <p className="text-gray-700 text-base mb-2">
                  Ingredients: {recipe.ingredients}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  Instructions: {recipe.instruction}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  Time: {recipe.time}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                {recipe.video_url && (
                  <iframe
                    className="w-full"
                    title={`${recipe.dish} Video`}
                    src={recipe.video_url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  />
                )}
              </div>
              <div className="px-6 py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(recipe._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OwnRecipe;
