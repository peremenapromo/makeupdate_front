import "./header.css";
import logo from "./../../img/Главная 2.svg";
import lessons from "./../../img/Уроки.svg";
import users from "./../../img/people.svg";
import date from "./../../img/Календарь.svg";
import userIcon from "./../../img/Group 83.svg";
import Language from "./../../img/Russian.svg";
import notification from "./../../img/Главная.svg";
import hamburger_menu from "./../../img/Гамбургер меню.svg";
import userLogo from "./../../img/User_logo.svg";
import place from "./../../img/Местоположение.svg";
import player from "./../../img/Group 102.svg";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">MAKEUPDATE</div>
          <div className="header__nav">
            <div className="nav__elements">
              <img src={logo} alt="Logo" /> <a href="#">Главная</a>
            </div>
            <div className="nav__elements">
              <img src={lessons} alt="Уроки" />
              <a href="#">Уроки</a>
            </div>
            <div className="nav__elements">
              <img src={users} alt="Пользователи" />
              <a href="#">Пользователи</a>
            </div>
            <div className="nav__elements">
              <img src={date} alt="События" />
              <a href="#">События</a>
            </div>
          </div>
          <div className="container__icons">
            <div className="container_elements">
             <a href="#"> <img src={notification} alt="Уведомления" /></a>
            </div>
            <div className="container_elements">
             <a href="#"> <img src={Language} alt="Язык" /></a>
            </div>
            <div className="container_elements">
             <a href="#"> <img src={userIcon} alt="Юзеры" /></a>
            </div>
            <div className="container_elements">
             <a href="#"> <img src={hamburger_menu} alt="меню-гамбургер" /></a>
            </div>
          </div>
        </div>
        <div className="container__names">
          <div className="firstName">ИМЯ</div>
          <div className="firstName">ФАМИЛИЯ</div>
        </div>

        <div className="container__user_img">
          <img src={userLogo} alt="Фотография пользователя" className="img" />
          <div className="user_info_cont">
            <span className="place">
              {" "}
              <img src={place} alt="Местоположение" />
              Не задано
            </span>
            <div className="container__views">
              <span className="player">
                {" "}
                <img src={player} alt="Плеер" />0
              </span>
              <span className="player">
                {" "}
                <img src={player} alt="Плеер" />0
              </span>
            </div>
            <button className="btn1">
              <a href="#">
                <span className="btn2">Редактировать</span>
              </a>
            </button>
            <button className="btn4">
              <a href="#">
                <span className="btn3">Опубликовать урок</span>
              </a>
            </button>
            <button className="btn4">
              <a href="#">
                <span className="btn3">Опубликовать событие</span>
              </a>
            </button>
            <button className="btn4">
              <a href="#">
                <span className="btn3">Опубликовать фото</span>
              </a>
            </button>
            <div className="about">
              <b>Обо мне:</b>
            </div>
            <div className="about2">Заполните описание</div>
          </div>
        </div>
        <div className="button__container">
          <button className="buttons">      
          Мои Уроки
          <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
            Доступ к урокам
            <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
            Избранные уроки
            <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
            Мои события
            <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
            Мое портфолио
            <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
            Подписчики
            <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
            Подписки
            <sup> (32)</sup>
            <a href=""></a>
          </button>
          <button className="buttons">
          <sup> (32)</sup>
            Финансы
            <a href=""></a>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
