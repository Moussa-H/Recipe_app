import React, { useState } from "react";
import axios from "axios";
import { local_auth } from "../Data_Source/local/local_auth";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: formValues.username,
      password: formValues.password,
    };
    return axios
      .post(
        "http://localhost/Recipe_app/Backend_recipe/api/v1/signin.php",
        userData
      )
      .then((response) => {
        // Handle success
        console.log(response.data.userid);
        local_auth.saveuserid(response.data.userid);
        navigate("/");
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
          <h2 className="text-center">Sign in</h2>
          <form onSubmit={handleSubmit}>
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
