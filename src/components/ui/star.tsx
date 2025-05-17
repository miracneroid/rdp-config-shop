import React, { useState, useEffect } from 'react';
//import './ShootingStar.css'; // You'll need to create this CSS file

const Star = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const addStar = () => {
      const newStar = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      };
      setStars(prevStars => [...prevStars, newStar]);
    };

    const intervalId = setInterval(addStar, 100);

    return () => clearInterval(intervalId);
  }, []);

  const removeStar = (id) => {
    setStars(prevStars => prevStars.filter(star => star.id !== id));
  };

  return (
    <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden'}}>
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}vw`,
            top: `${star.y}vh`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'white', //added background color
            borderRadius: '50%',
            animation: `shoot ${star.duration}s linear ${star.delay}s`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)', // Add a subtle glow
          }}
          onAnimationEnd={() => removeStar(star.id)}
        />
      ))}
       <style>{`
        @keyframes shoot {
          from {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100vw) translateY(-100vh); /* Adjust the distance */
            opacity: 0;
          }
        }
        .shooting-star-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .shooting-star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            box-shadow: 0 0 5px white;
            animation: shoot 1s linear;
        }
        `}
        </style>
    </div>
  );
};

export default Star;
