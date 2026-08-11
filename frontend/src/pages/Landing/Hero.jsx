import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToFeatures = () => {
    document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center justify-center px-5 pt-12 pb-16 text-center sm:px-8 sm:pt-16 md:pt-20 md:pb-24">
      <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Learning{" "}
        <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Reimagined
        </span>
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:mt-6 sm:text-lg">
        Turn your documents into clear explanations, summaries, flashcards, and quizzes — all powered by AI, all in one place.
      </p>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-5">
        <button
          onClick={scrollToFeatures}
          className="w-full rounded-full border border-gray-200 bg-white px-8 py-3 text-base text-black transition hover:scale-105 cursor-pointer sm:w-auto sm:py-4 sm:text-lg"
        >
          Features
        </button>
        <Link
          className="w-full rounded-full bg-black px-8 py-3 text-base text-white transition hover:scale-105 cursor-pointer sm:w-auto sm:py-4 sm:text-lg"
          to="/register"
        >
          Start learning
        </Link>
      </div>
    </section>
  );
};

export default Hero;
