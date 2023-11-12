import { Link } from "react-router-dom";
import { appRoutes } from "../appRoutes";
import { useSelector } from "react-redux";
import sandwatchImg from "../static/images/sandwatch.png";
import heartImg from "../static/images/heart.png";
import "../styles/Result.css";

export const Result = () => {
  const time= useSelector((state) => state.game.time);
  const score = useSelector((state) => state.game.score);
  
  return (
    <section className="main">
      <div className="container">
        <div className="results-wrapper">
          <h1 className="big-title results-title">Вы победили!</h1>
          <div className="results-stats">
            <div className="results-label">Набрано очков помощи:</div>
            <div className="results-score">
              <div className="results-score-number" id="score">
                {score}
              </div>
              <img src={heartImg} alt="" />
            </div>

            <div className="results-label">Времени прошло:</div>
            <div className="results-score">
              <div className="results-score-number" id="time">
                {time}
              </div>
              <img src={sandwatchImg} alt="" />
            </div>
          </div>
          <div className="results-buttons">
            <div className="main-button">
              <Link to={appRoutes.home} className="button">
                На главную страницу
              </Link>
            </div>
            <div className="main-button">
              <Link to={appRoutes.game} className="button">
                Играть снова
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
