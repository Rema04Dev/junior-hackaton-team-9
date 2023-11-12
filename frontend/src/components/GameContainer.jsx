import { useState, useEffect } from "react";
import _, { uniqueId } from 'lodash';

const GameContainer = ({ isActive, onFearClick, children }) => {
  const [fears, setFears] = useState([]);
  const [cells, setCells] = useState(Array(9).fill().map(() => ({ id: uniqueId() })));

  useEffect(() => {
    const generateRandomNumber = (fears) => {
      // console.log('create fears', fears, cells)
      const availableNumbers = cells
        .filter((cell) => {
          const fearsIdies = fears.map(({ cellId }) => cellId);
          return !fearsIdies.includes(cell.id);
        })
        .map(({ id }) => id);

      if (availableNumbers.length === 0) {
        // console.log("Все числа уже использованы.");
        return null;
      }

      const randomIndex = Math.floor(Math.random() * availableNumbers.length);

      console.log(
        "avial numbs",
        availableNumbers,
        randomIndex,
        availableNumbers[randomIndex]
      );

      return availableNumbers[randomIndex];
    };

    const createFear = () => {
      const newFear = generateRandomNumber(fears);
      const newFearId = uniqueId();

      if (newFear) {
        // setFears((prevFears) => [...prevFears, { id: newFearId, cellId: newFear }])
        setFears([...fears, { id: newFearId, cellId: newFear }]);

        setTimeout(() => {
          // console.log('удаляем из FEARS число', newFear, newFearId)
          setFears(() => fears.filter((fear) => fear.id !== newFearId));
        }, 15500);
      }
    };

    if (isActive) {
      const timerId = setInterval(() => {
        createFear(fears);
      }, 1500);
  
      return () => {
        clearInterval(timerId);
      };
    }
  }, [fears, cells, isActive]);

  const handleFearClick = (id) => () => {
    console.log("handle fear click container", id);
    onFearClick(id);
    setFears((prevFears) => prevFears.filter((fear) => fear.id !== id));
  };

  return (
    <div className="game-container">
      {cells.map((cell) => (
        <div key={cell.id} className={"cell"}>
          {fears
            .filter((fear) => fear.cellId === cell.id)
            .map((fear) => (
              <div
                className={`fear ${
                  fear.cellId === cell.id ? "visible" : ""
                }`}
                key={fear.id}
                onClick={handleFearClick(fear.id)}
              >
                { children }
              </div>
            ))}
        </div>
      ))}
    </div>
  )
};

export default GameContainer;