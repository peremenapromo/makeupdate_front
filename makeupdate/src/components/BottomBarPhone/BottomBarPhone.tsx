import { FC } from "react";
import { Link } from "react-router-dom";
// Styles
import styles from "./BottomBarPhone.module.scss";
// Image import
import events from "./img/events.svg";
import home from "./img/home.svg";
import lessons from "./img/lessons.svg";
import top_arrow from "./img/top_arrow.svg";
import usersPhoto from "../Burger/img/motinova.svg";
import users from "./img/users.svg";

export const BottomBarPhone: FC = () => {
  return (
    <div className={styles.mobileNavigationContainer}>
      <nav className={styles.navigate}>
        <ul className={styles.navigateList}>
          <Link to='/' className={styles.link}>
            <li className={styles.listElement}>
              <img
                className={styles.img_link}
                src={home}
                alt='home'
              />
            </li>
            <span>Главная</span>
          </Link>

          <Link to='/lessons' className={styles.link}>
            <li className={styles.listElement}>
              <img
                className={styles.img_link}
                src={lessons}
                alt='lessons'
              />
            </li>
            <span>Уроки</span>
          </Link>

          <Link to='/users' className={styles.link}>
            <li className={styles.listElement}>
              <img
                className={styles.img_link}
                src={users}
                alt='users'
              />
            </li>
            <span>Пользователи</span>
          </Link>

          <Link to='/events' className={styles.link}>
            <li className={styles.listElement}>
              <img
                className={styles.img_link}
                src={events}
                alt='events'
              />
            </li>
            <span>События</span>
          </Link>
        </ul>
        <Link to='/profile' className={styles.link}>
          <div className={styles.profileLink}>
            <img
              className={styles.img_link}
              src={usersPhoto}
              alt='undefined'
            />
            <img
              className={styles.img_link}
              src={top_arrow}
              alt='undefined'
            />
          </div>
          <span>Профиль</span>
        </Link>
      </nav>
    </div>
  );
};
