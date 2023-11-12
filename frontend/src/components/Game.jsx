/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import { useSelector, useDispatch } from "react-redux";
import { addFear, removeFear } from "../slices/gameSlice";
import { uniqueId } from "lodash";
import { ViolenceIcon } from "./fearsIcons/ViolenceIcon";
import { DarkIcon } from "./fearsIcons/DarkIcon";
import { PlaceIcon } from "./fearsIcons/PlaceIcon";
import { AdultIcon } from "./fearsIcons/AdultIcon";
import { SeparationIcon } from "./fearsIcons/SeparationIcon";
import GameContainer from "./GameContainer";

const Game = () => {
  let counter = 1;
  const [cells, setCells] = useState(Array(9).fill().map(() => ({ id: counter++ })));
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const fearsRedux = useSelector((state) => state.fears.items);
  // console.log(fearsRedux)
  const dispatch = useDispatch();


  const handleFearClick = (id) => {
    console.log("handle onFearClick", id);
    setScore((prevScore) => prevScore + 1);
  };

  const startGame = () => {
    setIsActive(true)
    setScore(0)
    const gameTimer = setTimeout(endGame, 5000)
    setTimerId(gameTimer)
  }

  const restartGame = () => {
    setIsActive(false)
    setScore(0)
    setIsActive(true)
  }

  const endGame = () => {
    setIsActive(false)
    console.log('END GAME', score)
  }

  return (
    <>
      <div className="game">
        <div className="container">
          <div className="game-field">
            <div className="score">Score: {score}</div>
            <button onClick={startGame} disabled={isActive}>Start Game</button>
            <button onClick={restartGame} disabled={!isActive}>Restart Game</button>
            <GameContainer onFearClick={handleFearClick} isActive={isActive} >
              <SeparationIcon width={80} />
            </GameContainer>
          </div>

          <div className="fears-description">
            <div className="fears-description-image">
              <ViolenceIcon width={80} />
            </div>

            <div className="fears-description-definition">
              <span>Насилие</span> - жестокое или плохое обращение с детьми
              выражается в форме физического и/или эмоционального плохого
              обращения, пренебрежения, отсутствия заботы или других форм,
              способных привести к ущербу для здоровья ребёнка.
            </div>

            <div className="fears-description-image">
              <DarkIcon width={80} />
            </div>

            <div className="fears-description-definition">
              <span>Темнота</span> - в основе детской лежит естественный процесс
              развития ребенка. У детей старше 3 лет активно развивается
              головной мозг, а вместе с ним — и воображение. Контролировать
              происходящее в неосвещенном пространстве ребенок не может, и
              возможность встречи с какой-либо опасностью пугает его.
            </div>

            <div className="fears-description-image">
              <PlaceIcon width={80} />
            </div>

            <div className="fears-description-definition">
              <span>Новые места</span> - наличие таких страхов закономерный этап
              его личностного развития. Причиной появления страхов является и
              разлука с матерью. Очень важно относится к ребенку с уважением, не
              высмеивая его страхи. Не стоит его заставлять переступать через
              себя, поскольку именно в такие моменты ему требуется любовь и
              участие.
            </div>

            <div className="fears-description-image">
              <AdultIcon width={80} />
            </div>

            <div className="fears-description-definition">
              <span>Взрослые люди</span> - По мере интеллектуального и
              эмоционального развития младенцев они быстро учатся узнавать и
              привязываются к своим родителям или воспитателям. Эта связь
              крепнет, и младенцы часто начинают волноваться или бояться, когда
              родители их оставляют или появляются незнакомцы.{" "}
            </div>

            <div className="fears-description-image">
              <SeparationIcon width={80} />
            </div>

            <div className="fears-description-definition">
              <span>Разлука</span> - Сепарационное тревожное расстройство
              (боязнь разлуки) заключается в постоянном интенсивном беспокойстве
              по поводу нахождения вдали от дома или от людей, к которым
              привязан ребенок, как правило, родителям.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
