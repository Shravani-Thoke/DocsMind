import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav className="flex items-center justify-between">
        <div className="h-35 w-50 overflow-hidden">
        <img className="w-full h-full object-cover object-center" src={logo} alt="DocsMind AI Logo" />
        </div>

        <div className="flex items-center gap-4 px-20 py-0">
          <button className="text-md text-gray-600 hover:text-gray-900 cursor-pointer">Features</button>
          <button className="text-md text-gray-600 hover:text-gray-900 cursor-pointer">About</button>
          <Link className="px-4 py-2 rounded-xl border bg-black text-white hover:cursor-pointer " to="/login">Sign In</Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
