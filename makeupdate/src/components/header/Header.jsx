import "./header.css";
import logo from "./../../img/Главная 2.svg";
import lessons from "./../../img/Уроки.svg";
import users from "./../../img/people.svg";
import date from "./../../img/Календарь.svg";
import userIcon from "./../../img/Group 83.svg";
import Language from "./../../img/Russian.svg";
import notification from "./../../img/Главная.svg";
import hamburger_menu from "./../../img/Гамбургер меню.svg";

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
        <div></div>
      </div>
    </header>
  );
}

export default Header;
