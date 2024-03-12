import  { useEffect } from "react";

// COMPONENTS IMPORTS
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import inputv from "./Addnew.json";
function AddNewRecipe() {
  // STATES AND VARIABLES
  const navigate = useNavigate();

  // FUNCTIONS
  const handleSubmit = () => {
    navigate("/");
  }

  // useEffects
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) navigate("/register");
  }, [])

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
          {inputv.map((obj,index)=>(
                      <Input
                      key={index}
                      type={obj.type}
                      placeholder={obj.placeholder}
                      name={obj.name}
                    />
          ))}
          <button
            className="bg-green-600 text-white p-3 font-semibold w-full rounded-lg hover:text-green-600 hover:bg-white border-green-600 border-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNewRecipe;
