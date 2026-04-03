'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProducts } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredProducts = mockProducts.slice(0, 4);

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-[2rem] mt-6 shadow-2xl ring-1 ring-white/10 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
            style={{ backgroundImage: `url(${featuredProducts[currentIndex].image})` }}
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 md:p-20">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="inline-block px-3 py-1 mb-4 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-sm">
                <span className="text-teal-400 font-bold tracking-widest uppercase text-xs">
                  Featured Innovation
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                {featuredProducts[currentIndex].name}
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-8 font-light">
                {featuredProducts[currentIndex].description}
              </p>
              
              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('scroll-to-products'))}
                className="bg-zinc-100 hover:bg-white text-zinc-950 px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Explore the Tech
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/50 hover:bg-teal-500 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-transparent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/50 hover:bg-teal-500 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 hover:border-transparent"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 bg-zinc-950/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {featuredProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-teal-500 w-8 shadow-[0_0_10px_rgba(20,184,166,0.8)]' : 'bg-zinc-500 w-2 hover:bg-zinc-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
