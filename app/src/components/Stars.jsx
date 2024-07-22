import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const generateStars = (numStars) => {
  return Array.from({ length: numStars }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 2,
  }));
};

const StarTwinkle = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const Star = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.y}%;
  left: ${(props) => props.x}%;
  animation: ${StarTwinkle} ${(props) => props.duration}s infinite ${(props) => props.delay}s;
`;

const SolarSystemContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ;
  overflow: hidden;
  pointer-events: none;
`;

const SolarSystem = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    setStars(generateStars(100)); // Generate 100 stars
  }, []);

  return (
    <SolarSystemContainer>
      {stars.map((star, index) => (
        <Star
          key={index}
          x={star.x}
          y={star.y}
          size={star.size}
          duration={star.duration}
          delay={star.delay}
        />
      ))}
    </SolarSystemContainer>
  );
};

export default SolarSystem;
