import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// COMPONENETS IMPORTS
import Input from "../components/Input";
import { INPUT_FIELD } from "../data/inputData";

function Registration() {
  // STATES AND VARIABLES
  const [isRegistered, setIsRegistered] = useState(true);
  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // FUNCTIONS
  const updateInput = (e) => {
    console.log(inputs);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const toggleRegistered = () => {
    setIsRegistered(!isRegistered);
  };

  const handleSubmit = () => {
    for (const value in inputs) {
      if (inputs[value].length === 0) {
        setError('true');
        return;
      }
    }
    localStorage.setItem("user", JSON.stringify(inputs))
    navigate("/");
  }

  // useEffects
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  }, [])

  return (
    <div className="w-screen h-screen bg-green-200 flex justify-center items-center">
      <form
        action=""
        className="p-8 bg-white flex flex-col justify-evenly items-center h-4/5 w-2/5 rounded-lg"
      >
        <div className="text-3xl font-bold cursor-pointer flex justify-center items-center">
          CulinaShare
        </div>
        {isRegistered ? (
          INPUT_FIELD.map((item) => (
            <Input
              type={item.type}
              placeholder={item.label}
              key={item.key}
              value={inputs[item.name]}
              handleChange={updateInput}
              name={item.name}
              errMsg={item.errormessage}
              error={error}
              {...item}
            />
          ))
        ) : (
          <>
            <Input
              type="email"
              placeholder="Email"
              key={102}
              value={inputs.email}
              handleChange={updateInput}
              name="email"
            />
            <Input
              type="password"
              placeholder="Password"
              key={101}
              value={inputs.password}
              handleChange={updateInput}
              name="password"
            />
          </>
        )}
        <button className="bg-green-600 text-white p-3 font-semibold w-full rounded-lg hover:text-green-600 hover:bg-white border-green border-2" onClick={handleSubmit}>
          Submit
        </button>
        {isRegistered ? (
          <span>
            Already have an account ?
            <a onClick={toggleRegistered} className="text-blue-600 hover:underline cursor-pointer">Log in</a>
          </span>
        ) : (
          <span>
            New user ?
            <a onClick={toggleRegistered} className="text-blue-600 hover:underline cursor-pointer">Registser here</a>
          </span>
        )}
      </form>
    </div>
  );
}

export default Registration;
