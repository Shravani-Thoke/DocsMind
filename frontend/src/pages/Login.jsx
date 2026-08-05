import React from "react";
import icon from "../assets/icon.png";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchUser } = useContext(AuthContext);

  const navigate=useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      await fetchUser();
      navigate("/dashboard");
    } catch (error) {
      console.log("AXIOS ERROR:", error);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Login failed"
  );
    }
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:3000/api/auth/google";
};

  return (
    <>
   
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6">
        <img className="h-15 mx-auto my-2 p-0" src={icon} alt="logo" />

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Let's continue your learning journey.
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
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
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

            <button className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 transition cursor-pointer"
            type="submit">
              Sign In
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link className="cursor-pointer text-black" to="/register">Sign up</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
