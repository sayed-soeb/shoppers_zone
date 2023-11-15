// Signup.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("https://ecommerce-app-by-rayyan.onrender.com/signup", {
        username,
        email,
        password,
      });

      toast.success(response.data.message);
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      setErrorMessage("Signup failed. Please try again."); // Handle error messages
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form>
        <div className="signup-form-group">
          <label className="signup-label" htmlFor="username">
            Username:
          </label>
          <input
            className="signup-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-label" htmlFor="email">
            Email:
          </label>
          <input
            className="signup-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-label" htmlFor="password">
            Password:
          </label>
          <input
            className="signup-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="signup-error-message">{errorMessage}</p>
        )}

        <button
          className="signup-button"
          type="button"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
