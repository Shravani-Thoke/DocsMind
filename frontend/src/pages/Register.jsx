import React from "react";
import icon from "../assets/icon.png";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate=useNavigate();

  const handleRegister = async (e) => {
      e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password },
        { withCredentials: true },
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed: " + error.response.data.message);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:3000/api/auth/google";
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6">
        <img className="h-15 mx-auto my-2 p-0" src={icon} alt="logo" />

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black">Create an account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Let's get your learning journey started.
          </p>
        </div>

        {/* Google Login */}
        <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
        onClick={handleGoogleLogin}>
          <div className="flex items-center justify-center gap-2">
            <img className="h-5 w-5 mr-3" src="https://www.svgrepo.com/show/355037/google.svg" alt="Google Logo" />
            <span>Continue with Google</span>
          </div>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          <span>or continue with</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Email / Password */}
        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />

            <button type="submit" className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition cursor-pointer">
              Sign Up
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link className="cursor-pointer text-black" to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
