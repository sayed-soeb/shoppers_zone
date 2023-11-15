// Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Make sure to import the custom CSS file

const Login = ({logs}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (log) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      // Assuming your server responds with a user object on successful login
      const user = response.data.user;

      // Store user information in local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home page
      navigate("/");
      logs();
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="custom-login-container">
      <h2>Login</h2>
      <form>
        <div className="custom-form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="custom-form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="custom-error-message">{errorMessage}</p>}
        <button type="button" className="custom-button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup" className="custom-link">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
