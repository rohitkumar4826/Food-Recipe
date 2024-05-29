import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// COMPONENETS IMPORTS
import Input from "../components/Input";
import { INPUT_FIELD } from "../data/inputData";

function Registration() {
  // STATES AND VARIABLES
  const [isRegistered, setIsRegistered] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Store any registration error
  const [inputs, setInputs] = useState({
    username: "",
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
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Email:", loginEmail);
    console.log("Login Password:", loginPassword);
    try {
      const resp = await axios.post("http://localhost:5001/api/auth/login", {
        loginEmail,
        loginPassword,
      });
      console.log("Response from login", resp.data.message);
      const storedData = localStorage.setItem(
        "accessToken",
        JSON.stringify(resp.data.accessToken)
      );
      console.log("accessToken", storedData);
      navigate("/");
    } catch (error) {
      console.log("Registration failed:", error.response);
    }
  };

  const handleSubmit = async (e) => {
    console.log("Data Submitted", inputs);
    e.preventDefault();

    // Check password match
    if (inputs.password !== inputs.confirmPassword) {
      console.log("password dont't match");
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true); // Set loading state to indicate ongoing request
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        inputs
      );
      console.log(
        "User Registered",
        response.data,
        response.data.user.username
      );
      const getToken = localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      console.log("GetToken", getToken);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      setError(error.response.data.message || "Registration failed"); // Handle various error scenarios
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }

    for (const value in inputs) {
      if (inputs[value].length === 0) {
        setError("true");
        return;
      }
    }
  };

  // useEffects
  useEffect(() => {
    const auth = localStorage.getItem("accessToken");
    if (auth) navigate("/");
  }, []);

  return (
    <div className="w-screen h-screen bg-green-200 flex justify-center items-center">
      {isRegistered && (
        <form
          action=""
          className="p-8 bg-white flex flex-col justify-evenly items-center h-4/5 w-2/5 rounded-lg"
        >
          <div className="text-3xl font-bold cursor-pointer flex justify-center items-center">
            CulinaShare
          </div>
          {INPUT_FIELD.map((item) => (
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
          ))}
          <button
            className="bg-green-600 text-white p-3 font-semibold w-full rounded-lg hover:text-green-600 hover:bg-white border-green border-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <span>
            Already have an account ?
            <a
              onClick={toggleRegistered}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Log in
            </a>
          </span>
        </form>
      )}

      {!isRegistered && (
        <form
          action=""
          className="p-8 bg-white flex flex-col justify-evenly items-center h-4/5 w-2/5 rounded-lg"
        >
          <div className="text-3xl font-bold cursor-pointer flex justify-center items-center">
            CulinaShare
          </div>

          <Input
            type="email"
            placeholder="Email"
            key={102}
            value={loginEmail}
            handleChange={(e) => setLoginEmail(e.target.value)}
            name="email"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            key={101}
            value={loginPassword}
            handleChange={(e) => setLoginPassword(e.target.value)}
            name="password"
            required
          />
          <button
            className="bg-green-600 text-white p-3 font-semibold w-full rounded-lg hover:text-green-600 hover:bg-white border-green border-2"
            onClick={handleLoginSubmit}
          >
            Submit
          </button>

          <span>
            New user ?
            <a
              onClick={toggleRegistered}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Registser here
            </a>
          </span>
        </form>
      )}
    </div>
  );
}

export default Registration;
