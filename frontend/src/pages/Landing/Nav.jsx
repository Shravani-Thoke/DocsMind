import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="w-full">
      <nav className="flex items-center justify-between px-4 sm:px-8 lg:px-20">
        <div className="h-20 w-28 overflow-hidden sm:h-28 sm:w-40 lg:h-35 lg:w-50">
        <img className="h-full w-full object-cover object-center" src={logo} alt="DocsMind AI Logo" />
        </div>

        <div className="flex items-center gap-2 py-3 sm:gap-4">
          <button onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })} className="hidden text-md text-gray-600 hover:text-gray-900 cursor-pointer md:block">Overview</button>
          <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hidden text-md text-gray-600 hover:text-gray-900 cursor-pointer md:block">Features</button>
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hidden text-md text-gray-600 hover:text-gray-900 cursor-pointer md:block">About</button>
          <Link className="whitespace-nowrap rounded-xl border bg-black px-3 py-2 text-sm text-white transition hover:bg-black/90 sm:px-4 sm:text-base" to="/login">Sign In</Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
