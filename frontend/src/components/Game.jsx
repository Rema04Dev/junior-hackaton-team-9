import React, { useState, useEffect } from 'react';
import '../styles/Game.css'; // Подключите стили

const Game = () => {
  const [fears, setFears] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log('use effect ')
    const fearInterval = setInterval(() => {
      createFear();
    }, 20000);

    return () => {
      clearInterval(fearInterval);
    };
  }, [score]);

  const createFear = () => {
    console.log('create fear')
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);

    const newFear = {
      id: Date.now(),
      top: `${row * 33.33}%`,
      left: `${col * 33.33}%`,
    };

    setFears((prevFears) => [...prevFears, newFear]);

    setTimeout(() => {
      setFears((prevFears) => prevFears.filter((fear) => fear.id !== newFear.id));
    }, 60000); // Измените время, в течение которого страх виден, по вашему усмотрению
  };

  const handleFearClick = (id) => {
    setScore((prevScore) => prevScore + 1);
    setFears((prevFears) => prevFears.filter((fear) => fear.id !== id));
  };
  
  const FearIcon = () => <div>O</div>

  return (
    <div className="game-container">
      {fears.map((fear) => (
        <div
          key={fear.id}
          className={`fear ${fear.visible ? 'visible' : ''}`}
          style={{ top: fear.top, left: fear.left }}
          onClick={() => handleFearClick(fear.id)}
        >
          <FearIcon />
        </div>
      ))}
      <div className="score">Score: {score}</div>
    </div>
  );
};


export default Game;
