import React, { useEffect, useState, useRef } from 'react';
import './carousel.css';

export default function Carousel({ images = [], interval = 4000, alt = 'Imagem do carrossel' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div className="carousel-slide" key={i}>
              <img src={src} alt={`${alt} ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="carousel-arrow left"
        onClick={goPrev}
        aria-label="Imagem anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="carousel-arrow right"
        onClick={goNext}
        aria-label="Próxima imagem"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}