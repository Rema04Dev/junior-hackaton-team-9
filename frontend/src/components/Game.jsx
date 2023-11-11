/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../styles/Game.css';
import _ from 'lodash';


const Game = () => {
  let counter = 1;
  const [cells, setCells] = useState(Array(9).fill().map(() => ({ id: counter++ })));
  const [fears, setFears] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log('cells', cells)
  }, [cells])

  useEffect(() => {
    console.log('useEffect FEARS', fears)
  }, [fears])

  useEffect(() => {
    const createFear = () => {
      console.log('create fear', fears, cells) // выберем рандомное число из тех что не входят в уже имеющиеся страхи

      const generateRandomNumber = () => {
        const availableNumbers = cells
          .filter((cell) => {
            console.log('filter avil nums', fears.includes(cell.id))
            return !fears.includes(cell.id)
          })
          .map(({ id }) => id);
        console.log('avial numbs', availableNumbers)
  
        if (availableNumbers.length === 0) {
          console.log("Все числа уже использованы.");
          return null;
        }
  
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        return availableNumbers[randomIndex];
      };
  
      const randomNumber = generateRandomNumber();
  
      if (randomNumber) {
        console.log("Сгенерированное число:", randomNumber);
        setFears(() => [...fears, randomNumber]);
      }
  
      setTimeout(() => {
        console.log('удаляем из FEARS число', randomNumber)
        setFears(() => fears.filter((fear) => fear !== randomNumber));
      }, 60000);
    };

    const fearInterval = setInterval(() => {
      createFear();
    }, 5000);
    
    return () => {
      clearInterval(fearInterval);
    };
  }, [score, fears, cells]);



  const handleFearClick = (id) => () => {
    console.log('handle fear click', id)
    setScore((prevScore) => prevScore + 1);
    setFears((prevFears) => prevFears.filter((fear) => fear !== id));
  };

  const FearIcon = () => <div>{'\u{1F47B}'}</div>

  return (
    <>
      <div className="game-container">
        {cells.map((cell) => (
          <div key={cell.id} className={'cell'} >
            {fears.filter((fear) => fear === cell.id).map((fear) => (
              <div className='fear' key={fear} onClick={handleFearClick(fear)} >
                <FearIcon />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="score">Score: {score}</div>
    </>
  );
};


export default Game;
