import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

import renderStars from "../Functions/renderStars.js";

export default function BrowseRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleSubmit = () => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const fetchRecipes = () => {
    return axios
      .get(
        "http://localhost/Recipe_app/Backend_recipe/api/v1/getallrecipes.php"
      )
      .then((response) => {
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initialize filteredRecipes with all recipes
        console.log("allrecipes", response.data);
      });
  };

  return (
    <div className="container-list">
      <div className="search-fields">
        <input
          className="browse-search"
          type="text"
          name="search_recipe"
          value={searchName}
          onChange={handleChange}
          placeholder="Find a recipe..."
          required
        />
        <button onClick={handleSubmit} className="btn-search">
          <CiSearch />
        </button>
        <Link to="createrecipe" className="btn-add">
          <IoCreateOutline />
        </Link>
      </div>
      <div className="recipe-list">
        {filteredRecipes.map((data) => (
          <div className="recipe-card" key={data.recipe_id}>
            <Link to={`/recipe/${data.recipe_id}`}>
              <img
                src={data.image_url}
                className="recipe-card-image"
                alt="img"
              />
            </Link>
            <div className="recipe-card-content">
              <Link
                to={`/recipe/${data.recipe_id}`}
                className="recipe-card-title"
              >
                {data.name}
              </Link>
              <div className="rating">{renderStars(data.star)}</div>
              <div className="recipe-ingredients">{data.ingredients}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
