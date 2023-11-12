import { useState, useEffect, useRef } from "react";
import _, { uniqueId } from "lodash";
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

const GameContainer = ({ isActive, onFearClick, level }) => {
  const [fears, setFears] = useState([]);
  const [cells, setCells] = useState(
    Array(9)
      .fill()
      .map(() => ({ id: uniqueId() }))
  );

  useEffect(() => {
    const generateRandomNumber = (fears) => {
      const availableNumbers = cells
        .filter((cell) => {
          const fearsIdies = fears.map(({ cellId }) => cellId);
          return !fearsIdies.includes(cell.id);
        })
        .map(({ id }) => id);

      if (availableNumbers.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * availableNumbers.length);

      return availableNumbers[randomIndex];
    };

    const createFear = () => {
      const newFear = generateRandomNumber(fears);
      const newFearId = uniqueId();

      if (newFear) {
        setFears([...fears, { id: newFearId, cellId: newFear }]);

        setTimeout(() => {         
          setFears(() => fears.filter((fear) => fear.id !== newFearId));
        }, 2000);
      }
    };

    if (isActive) {
      const timerId = setInterval(() => {
        createFear(fears);
      }, 700);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [fears, cells, isActive, level]);

  const refCell = useRef(null);

  const handleFearClick = (id) => (evt) => {
    onFearClick(id);
    refCell.current?.classList.add('touched');
    setTimeout(() => {
      setFears((prevFears) => prevFears.filter((fear) => fear.id !== id));
      refCell.current?.classList.remove('touched');
    }, 300)
  };


  return (
    <div className="game-container">
      {cells.map((cell) => (
        <div key={cell.id} className={"cell"}>
          {fears
            .filter((fear) => fear.cellId === cell.id)
            .map((fear) => {
              return <div
                className={`fear ${fear.cellId === cell.id ? "visible" : ""}`}
                key={fear.id}
                onClick={handleFearClick(fear.id)}
                ref={refCell}
              >
                {<DarkIcon width={80} />}
              </div>
             }
            )}
        </div>
      ))}
    </div>
  );
};

export default GameContainer;
