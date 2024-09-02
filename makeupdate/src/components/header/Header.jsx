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
              <img src={logo} alt="Logo" /> Главная
            </div>
            <div className="nav__elements">
              <img src={lessons} alt="Уроки" />
              Уроки
            </div>
            <div className="nav__elements">
              <img src={users} alt="Пользователи" />
              Пользователи
            </div>
            <div className="nav__elements">
              <img src={date} alt="События" />
              События
            </div>
          </div>
          <div className="container__icons">
            <div className="container_elements">
              <img src={notification} alt="Уведомления" />
            </div>
            <div className="container_elements">
              <img src={Language} alt="Язык" />
            </div>
            <div className="container_elements">
              <img src={userIcon} alt="Юзеры" />
            </div>
            <div className="container_elements">
              <img src={hamburger_menu} alt="меню-гамбургер" />
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
           <span className="place"> <img src={place} alt="Местоположение" />Не задано</span>
         <div className="container__views">
          <span className="player"> <img src={player} alt="Плеер" />0</span>
          <span className="player"> <img src={player} alt="Плеер" />0</span>
         </div>
         <button className="btn1">Редактировать</button>
         <button>Опубликовать урок</button>
         <button>Опубликовать событие</button>
         <button>Опубликовать фото</button>
         <div className="about"><b>Обо мне:</b></div>
         <div className="about2">Заполните описание</div>
        </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
