import React, { useState } from "react";
import axios from "axios";



export default function Signup() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      first_name: formValues.firstname,
      last_name: formValues.lastname,
      username: formValues.username,
      password: formValues.password,
    };
    return axios
      .post(
        "http://localhost/Recipe_app/Backend_recipe/api/v1/signup.php",
        userData
      )
      .then((response) => {
        // Handle success
        console.log(response.data);
      
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                value={formValues.firstname}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                value={formValues.lastname}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
