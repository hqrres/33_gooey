"use client"

import { useState, useEffect } from 'react';

export default function HeroV0() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagePaths = [
    '/img/img_1.jpg',
    '/img/img_2.jpg',
    '/img/img_3.jpg',
    '/img/img_4.jpg',
    '/img/img_5.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [imagePaths.length]);

  return (
    <div className="relative h-[600px] w-full flex justify-center items-center overflow-hidden">
      {imagePaths.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`absolute transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ))}
      <div className="absolute bottom-4 flex space-x-2">
        {imagePaths.map((_, index) => (
          <span
            key={index}
            className={`block w-3 h-3 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 