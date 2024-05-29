import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// ICON IMPORTS
import favoriteIcon from "../assets/icons/bookmark.png";
import savedIcon from "../assets/icons/saved.png";

// COMPONENTS IMPORTS
import Navbar from "../components/Navbar";
import { readRecipeById } from "../apis/recipes";

function Recipie() {
  // STATES AND VARIABLES
  const { id } = useParams();
  console.log("This is id", id);
  const [savedItem, setSavedItem] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  // FUNCTIONS
  const getRecipeById = async () => {
    const data = await readRecipeById(id);
    console.log("Data", data);
    setRecipe(data.meals[0]);
  };
  const handleSavedRecipes = async () => {
    if (!savedItem) {
      setSavedItem(true);
      const savedRecipes =
        JSON.parse(localStorage.getItem("savedRecipe")) || [];
      localStorage.setItem(
        "savedRecipe",
        JSON.stringify([...savedRecipes, recipe])
      );
    } else {
      setSavedItem(false);
      const savedRecipes = JSON.parse(localStorage.getItem("savedRecipe"));
      const updatedRecipes = savedRecipes.filter((item) => item.idMeal !== id);
      localStorage.setItem("savedRecipe", JSON.stringify(updatedRecipes));
    }
  };


  const handleAudio = async () => {
  
    try {
      const data=recipe.strInstructions;
      const response = await axios.post("http://localhost:8000/api/tts", {
        text: data,
      });
  
      if (response.status === 200 && response.headers['content-type'] === 'audio/mp3') {
        const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        console.log("Audio Blob:", audioBlob);
        console.log("Audio URL:", audioUrl);
        console.log("Is Playing:", isPlaying);        
            // Update audio element source
        setIsPlaying(true);
      } else if (response.status === 422) {
        console.error("Unprocessable Entity:", response.data);
        alert("The text you provided might be invalid or the API encountered an error. Please try again later.");
      } else {
        console.error("Unexpected response format:", response.headers['content-type']);
        alert("An error occurred during conversion. Please try again later.");
      }
    } catch (error) {
      console.error("Error converting text to speech:", error);
      alert("An error occurred during conversion. Please try again later.");
    }
  };
  
  useEffect(() => {
    // Cleanup audio URL when component unmounts (optional)
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);
  useEffect(() => {
    if (audioUrl) {
      setTimeout(() => {
        const audioElement = document.getElementById("myAudioElement");
        audioElement.src = audioUrl;
      }, 100); // Adjust delay if needed
    }
  }, [audioUrl]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipe"));
    if (savedRecipes) {
      const isPresent = savedRecipes.find((item) => item.idMeal === id);
      if (isPresent) {
        setSavedItem(true);
      }
    }
  }, [id]);

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
              onClick={handleSavedRecipes}
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
              {(() => {
                var ingredients = [];
                for (var i = 1; i <= 20; i++) {
                  if (recipe[`strIngredient${i}`] !== "") {
                    ingredients.push(recipe[`strIngredient${i}`]);
                  }
                }
                return ingredients.join(", "); // Join ingredients into a comma-separated string
              })()}
            </p>
          </div>
          <div className="bg-green-200 rounded-lg p-5">
            <div className="fold flex justify-between">
              <h5 className="font-bold text-xl text-green-600">
                Instruction:{" "}
              </h5>
            </div>
            <div>
              <h2>{recipe.name}</h2>
              <p>{recipe.strInstructions}</p>
              <button onClick={handleAudio} className="text-black font-black" disabled={isPlaying}>
                {isPlaying ? "Stop Audio" : "Play Instructions"}
              </button>
              {audioUrl && (
                <>
                <audio
                  src=""
                  id="myAudioElement"
                  autoPlay
                  onEnded={() => setIsPlaying(false)}
                  controls
                />
                <h1>{audioUrl}</h1>
                </>
              )}
              <audio controls src={audioUrl}>
              Your browser does not support the audio element.
             </audio>

            </div>
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
