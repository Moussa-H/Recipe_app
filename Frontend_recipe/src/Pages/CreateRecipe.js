import React, { useState } from "react";
import axios from "axios";
import { local_auth } from "../Data_Source/local/local_auth";
import { useNavigate, Link } from "react-router-dom";

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    ingredients: "",
    steps: "",
    image: null, // Changed to handle file input
  });
  const [message, setMessage] = useState(""); // Added to handle messages

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("ingredients", formValues.ingredients);
    formData.append("steps", formValues.steps);
    formData.append("image", formValues.image);
    formData.append("user_id", local_auth.getuserid());

    axios
      .post(
        "http://localhost/Recipe_app/Backend_recipe/api/v1/createrecipe.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        // Handle success
        setMessage("Recipe created successfully!");
        navigate("/Browse");
      })
      .catch((error) => {
        // Handle error
        setMessage("Error creating recipe.");
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return local_auth.getuserid() ? (
    <div className="container mt-4">
      <h1 className="mb-4">Create Recipe</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Recipe Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter the recipe name.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients:
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            className="form-control"
            rows="3"
            value={formValues.ingredients}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter the ingredients.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="steps" className="form-label">
            Steps:
          </label>
          <textarea
            id="steps"
            name="steps"
            className="form-control"
            rows="3"
            value={formValues.steps}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter the steps.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Recipe
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  ) : (
    <>
      <div className="thatix-progression-notification-login">
        <i className="fas fa-lock"></i>
        Please <Link to="/signin">log in</Link> or{" "}
        <Link to="/signup">register for a new account</Link> in order to leave a
        review.
      </div>
    </>
  );
}
