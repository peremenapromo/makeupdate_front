import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">MAKEUPDATE</div>
          <div className="header__nav">
            <div className="nav__elements">Главная</div>
            <div className="nav__elements">Уроки</div>
            <div className="nav__elements">Пользователи</div>
            <div className="nav__elements">События</div>
          </div>
          <div className="container__icons">
            <div className="container_elements">Уведомление</div>
            <div className="container_elements">Язык</div>
            <div className="container_elements">Юзер</div>
            <div className="container_elements">Гамбургер-меню</div>
          </div>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
