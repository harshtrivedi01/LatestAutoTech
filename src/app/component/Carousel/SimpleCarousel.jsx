'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.css';

export default function SimpleCarousel({ items, autoPlay = true, interval = 5000 }) {
  const [current, setCurrent] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* Slides */}
        <div className="carousel-slides">
          {items.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === current ? 'active' : ''}`}
            >
              {typeof item === 'string' ? (
                <img src={item} alt={`Slide ${index}`} className="carousel-image" />
              ) : (
                item
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="carousel-button carousel-button-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="carousel-button carousel-button-next"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot ${index === current ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
