import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Components/Sign-in";
import BrowseRecipes from "./Pages/BrowseRecipes";
import RecipeDetails from "./Pages/RecipeDetails";
import CreateRecipe from "./Pages/CreateRecipe";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<BrowseRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/createrecipe" element={<CreateRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
