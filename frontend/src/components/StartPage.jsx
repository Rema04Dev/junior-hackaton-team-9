import familyImg from "../static/images/family.jpg";
import "../styles/StartPage.css";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <>
      <section className="main">
        <div className="container">
          <h1 className="big-title">
            Помогите детям с сиротским прошлым справиться со своими страхами!
          </h1>
          <div className="content-flex-wrapper">
            <div className="main-content">
              <div className="main-description">
                Cуществует много страхов, которые неочевидны для людей, далеких
                от темы: а какие это вообще страхи? с чем сталкиваются родители?
                с чем сталкиваются дети?
              </div>
              <div className="main-description">
                В этом поможет разобраться наша мини-игра с простыми правилами:
                <ul>
                  <li>
                    На игровом поле появляются иконки, символизирующие различные
                    страхи, которые могут преследовать ребенка: боязнь новых
                    мест, взаимодействие со взрослыми, врачами, органами опеки и
                    многие другие.
                  </li>
                  <li>
                    Расправьтесь с каждым страхом при помощи вашего оружия
                  </li>
                  <li>
                    Чем больше очков вы наберете, тем больше поможете справиться
                    ребенку с его страхами
                  </li>
                </ul>
              </div>
              <div className="main-button">
                <Link to="/game" className="button">
                  Начать игру
                </Link>
              </div>
            </div>
            <div className="main-image">
              <img src={familyImg} alt="Главная картинка" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StartPage;
