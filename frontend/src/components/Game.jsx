/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../styles/Game.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFear, removeFear } from '../slices/gameSlice';
import { uniqueId } from 'lodash';

const Game = () => {
  let counter = 1;
  const [cells, setCells] = useState(Array(9).fill().map(() => ({ id: counter++ })));
  const [fears, setFears] = useState([]);
  const [score, setScore] = useState(0);

  const fearsRedux = useSelector((state) => state.fears.items);
  // console.log(fearsRedux)
  const dispatch = useDispatch();

  useEffect(() => {
    const generateRandomNumber = (fears) => {
      // console.log('create fears', fears, cells)
      const availableNumbers = cells
        .filter((cell) => {
          const fearsIdies = fears.map(({ cellId }) => cellId)
          return !fearsIdies.includes(cell.id)
        })
        .map(({ id }) => id);
  
        if (availableNumbers.length === 0) {
          // console.log("Все числа уже использованы.");
          return null;
        }
        
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    
      console.log('avial numbs', availableNumbers, randomIndex, availableNumbers[randomIndex])
    
      return availableNumbers[randomIndex];
    };

    const createFear = () => {
      const newFear = generateRandomNumber(fears);
      const newFearId = uniqueId()

      if (newFear) {
        setFears((prevFears) => [...prevFears, { id: newFearId, cellId: newFear }])


        setTimeout(() => {
          // console.log('удаляем из FEARS число', newFear, newFearId)
          setFears(() => fears.filter((fear) => fear.id !== newFearId));
        }, 30000);
      }
    }

    const timerId = setInterval(() => {
      createFear(fears);
    }, 7000)

    return () => {
      clearInterval(timerId)
    };
  }, [fears, cells]);

  const handleFearClick = (id) => () => {
    console.log('handle fear click', id)
    setScore((prevScore) => prevScore + 1);
    setFears((prevFears) => prevFears.filter((fear) => fear.id !== id));
  };

  const FearIcon = () => <div>{'\u{1F47B}'}</div>

  return (
    <>
      <div className="game-container">
        {cells.map((cell) => (
          <div key={cell.id} className={'cell'} >
            {fears.filter((fear) => fear.cellId === cell.id).map((fear) => (
              <div
                className={`fear ${fear.cellId === cell.id ? 'visible' : ''}`}
                key={fear.id}
                onClick={handleFearClick(fear.id)}
              >
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
