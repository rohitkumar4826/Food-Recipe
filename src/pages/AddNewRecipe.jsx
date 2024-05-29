import { useEffect, useState } from "react";
import axios from "axios";
// COMPONENTS IMPORTS
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import inputv from "./Addnew.json";
function AddNewRecipe() {
  const [savedata, setSavedata] = useState({
    dish: "",
    ingredients: "",
    instruction: "",
    time: "",
    img_url: "",
    video_url: "",
  });

  // STATES AND VARIABLES
  const navigate = useNavigate();

  // FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/add_recipe",
        savedata
      );
      console.log("Response from add new recipe", response.data);
    } catch (err) {
      console.log("Error while adding new recipe", err.response);
    }
    navigate("/");
  };

  const handleChange = (e) => {
    setSavedata((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log("Print the Savedata", savedata);
  };

  // useEffects
  useEffect(() => {
    const auth = localStorage.getItem("accessToken");
    if (!auth) navigate("/register");
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen bg-green-200 flex justify-center items-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className="p-8 bg-white flex flex-col justify-evenly items-center h-4/5 w-2/5 rounded-lg"
        >
          <div className="text-3xl font-bold cursor-pointer flex justify-center items-center">
            CulinaShare - Contribute Us
          </div>
          {inputv.map((obj, index) => (
            <Input
              key={index}
              type={obj.type}
              placeholder={obj.placeholder}
              name={obj.name}
              handleChange={handleChange}
            />
          ))}
          <button className="bg-green-600 text-white p-3 font-semibold w-full rounded-lg hover:text-green-600 hover:bg-white border-green-600 border-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNewRecipe;
