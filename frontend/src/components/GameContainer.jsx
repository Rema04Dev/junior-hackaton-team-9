import { useState, useEffect } from "react";
import _, { uniqueId } from "lodash";
import { getRandomNumberByRange } from "../utils";
import { fearElements } from "./fearsIcons";
import { DarkIcon } from "./fearsIcons/DarkIcon";

const levelMapping = {
  'easy': {
    speedAppearing: 2000,
    clearTime: 15000,
  },
  'medium': {
    speedAppearing: 1500,
    clearTime: 12000,
  },
  'hard': {
    speedAppearing: 500,
    clearTime: 6000,
  }
}

const GameContainer = ({ isActive, onFearClick, children, level }) => {
  const [fears, setFears] = useState([]);
  const [cells, setCells] = useState(
    Array(9)
      .fill()
      .map(() => ({ id: uniqueId() }))
  );

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
        }, levelMapping[level].clearTime);
      }
    };

    if (isActive) {
      const timerId = setInterval(() => {
        createFear(fears);
      }, levelMapping[level].speedAppearing);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [fears, cells, isActive, level]);

  const handleFearClick = (id) => () => {
    console.log("handle fear click container", id);
    onFearClick(id);
    setFears((prevFears) => prevFears.filter((fear) => fear.id !== id));
  };

  const getIcon = () => {
    const randomFearIcon = getRandomNumberByRange(0, fearElements.length - 1);
    return fearElements[randomFearIcon].icon;
  }

  return (
    <div className="game-container">
      {cells.map((cell) => (
        <div key={cell.id} className={"cell"}>
          {fears
            .filter((fear) => fear.cellId === cell.id)
            .map((fear) => (
              <div
                className={`fear ${fear.cellId === cell.id ? "visible" : ""}`}
                key={fear.id}
                onClick={handleFearClick(fear.id)}
              >
                {/* {getIcon()} */}
                <DarkIcon width={80}/>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default GameContainer;
