import React, { useEffect, useState } from 'react';


const generateStars = (numStars) => {
  return Array.from({ length: numStars }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 2,
  }));
};

const SolarSystem = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(100)); // Generate 100 stars
  }, []);

  return (
    <div className="solar-system-container">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default SolarSystem;
