import React from 'react'
import Hero from './Hero'
import Nav from './Nav'
import InteractiveDemo from './InteractiveDemo'
import Features from './Features'
import About from './About'
import Footer from './Footer'

const Landing = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-blue-300/35 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -right-32 h-112 w-112 rounded-full bg-emerald-300/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl" />

        <div className="relative z-10">
          <Nav/>
          <Hero/>
          <InteractiveDemo/>
          <Features/>
          <About/>
          <Footer/>
        </div>
    </div>
  )
}

export default Landing
