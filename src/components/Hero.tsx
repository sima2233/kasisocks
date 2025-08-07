import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return <section className="relative bg-black text-white h-[70vh] flex items-center">
      <div className="absolute inset-0 opacity-70 bg-[url('https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Elevate Your Style From The Ground Up
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Premium socks that blend comfort with sophistication. Express
            yourself with every step.
          </p>
          <Link to="/catalogue" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-8 rounded-sm transition-colors inline-block">
            Shop Collection
          </Link>
        </div>
      </div>
    </section>;
};
export default Hero;