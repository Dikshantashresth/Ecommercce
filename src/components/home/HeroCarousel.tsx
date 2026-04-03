'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProducts } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const featuredProducts = mockProducts.slice(0, 4);

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-[2rem] mt-6 ring-1 ring-gray-200 dark:ring-white/10 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.4 }}
          className="absolute inset-0 will-change-transform transform-gpu"
        >
          <Image
            src={featuredProducts[currentIndex].image}
            alt={featuredProducts[currentIndex].name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 md:p-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'tween', duration: 0.35 }}
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
                className="bg-white hover:bg-zinc-100 text-zinc-950 px-8 py-3.5 rounded-full font-bold transition-colors active:scale-95"
              >
                Explore the Tech
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-teal-500 text-white backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 border border-white/20 hover:border-transparent"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-teal-500 text-white backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 border border-white/20 hover:border-transparent"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {featuredProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-teal-500 w-8' : 'bg-zinc-400 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
