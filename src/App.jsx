import { BrowserRouter, Route, Routes } from "react-router-dom";

// PAGES IMPORTS
import Home from "./pages/Home";
import Recipie from "./pages/Recipie";
import Registration from "./pages/Registration";
import AddNewRecipe from "./pages/AddNewRecipe";
import Saved from "./pages/Saved";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/register" element={<Registration />}/>
      <Route path="/recipe/:id" element={<Recipie />}/>
      <Route path="/new-recipe" element={<AddNewRecipe />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/saved" element={<Saved />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
