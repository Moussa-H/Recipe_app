import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import renderStars from "../Functions/renderStars.js";
import { local_auth } from "../Data_Source/local/local_auth";
import CommentSection from "../Components/CommentSection.js";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost/Recipe_app/Backend_recipe/api/v1/getrecipebyid.php?recipe_id=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data[0]); // Assuming the data is an array and we need the first item
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!recipe) return <div>No recipe found</div>;

  const ingredients = recipe.ingredients ? recipe.ingredients.split(",") : [];
  const steps = recipe.steps ? recipe.steps.split(".") : [];

  console.log(local_auth.getuserid);
  return (
    <div>
      <div className="recipe-card-details">
        <img
          src={recipe.image_url}
          className="recipe-card-image-details"
          alt="img"
        />

        <div className="recipe-card-content">
          <div className="recipe-card-title">{recipe.name}</div>
          <div className="rating">{renderStars(recipe.star)}</div>
          <h2>Ingredient</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2>Steps</h2>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          {local_auth.getuserid() ? (
            <CommentSection />
          ) : (
            <>
              <h2>Leave a Review</h2>
              <div className="thatix-progression-notification-login">
                <i className="fas fa-lock"></i>
                Please <Link to="/signin">log in</Link> or{" "}
                <Link to="/signup">register for a new account</Link> in order to
                leave a review.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
