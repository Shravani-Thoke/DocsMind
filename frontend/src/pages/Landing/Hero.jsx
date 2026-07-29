import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
       <section className="flex flex-col items-center justify-center text-center px-4 mt-10">

  <h1 className="text-7xl -tracking-normal font-bold leading-tight">
    Learning,
    <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
      Reimagined
    </span>
  </h1>

  <p className="mt-6 max-w-2xl text-gray-500 text-lg">
    Turn your documents into clear explanations, summaries, flashcards, and quizzes — all powered by AI, all in one place.
  </p>
<div className='flex justify-center items-center gap-6'>
  <button className="mt-10 px-8 py-4 rounded-full bg-white text-black text-lg border hover:scale-105 cursor-pointer">
    Features
  </button>
  <Link className="mt-10 px-8 py-4 rounded-full bg-black text-white text-lg hover: cursor-pointer" to="/register">
    Start learning
  </Link>

</div>
</section>
 
    </div>
  )
}

export default Hero