import { FC } from "react";
import { Link } from "react-router-dom";
// Styles
import styles from "./BottomBarPhone.module.scss";
// Image import
import undefined from "../../app/assets/profileCard/photo_undefined.svg";
import events from "./img/events.svg";
import home from "./img/home.svg";
import lessons from "./img/lessons.svg";
import top_arrow from "./img/top_arrow.svg";
import users from "./img/users.svg";

export const BottomBarPhone: FC = () => {
  return (
    // <div className={styles.box_bottom_bar}>
    //   <div className={styles.primary_link}>
    //     <div className={styles.box_link}>
    //       <Link className={styles.link} to='/'>
    //         <img className={styles.img_link} src={home} alt='' />
    //       </Link>
    //       <p className={styles.text_link}>Главная</p>
    //     </div>
    //     <div className={styles.box_link}>
    //       <Link className={styles.link} to='/lessons'>
    //         <img className={styles.img_link} src={lessons} alt='' />
    //       </Link>
    //       <p className={styles.text_link}>Уроки</p>
    //     </div>
    //     <div className={styles.box_link_users}>
    //       <Link className={styles.link} to='/users'>
    //         <img className={styles.img_link} src={users} alt='' />
    //       </Link>
    //       <p className={styles.text_link}> Пользователи</p>
    //     </div>
    //     <div className={styles.box_link}>
    //       <Link className={styles.link} to='/events'>
    //         <img className={styles.img_link} src={events} alt='' />
    //       </Link>
    //       <p className={styles.text_link}>События</p>
    //     </div>
    //   </div>

    //   <div className={styles.secondary_link}>
    //     <div className={styles.box_bar_profile}>
    //       <Link className={styles.profile_link} to='/profile'>
    //         <img
    //           className={styles.profile_bar}
    //           src={undefined}
    //           alt='icon'
    //         />{" "}
    //         <img
    //           className={styles.arrow_profile}
    //           src={top_arrow}
    //           alt=''
    //         />
    //       </Link>
    //       <p className={styles.text_link}>Профиль</p>
    //     </div>
    //   </div>
    // </div>
    <div className={styles.mobileNavigationContainer}>
      <nav className={styles.navigate}>
        <ul className={styles.navigateList}>
          <Link to='/' className={styles.link}>
            <li className={styles.listElement}>
              <img className={styles.img_link} src={home} alt='home' />
            </li>
            <span>Главная</span>
          </Link>

          <Link to='/' className={styles.link}>
            <li className={styles.listElement}>
              <img className={styles.img_link} src={lessons} alt='lessons' />
            </li>
            <span>Главная</span>
          </Link>

          <Link to='/' className={styles.link}>
            <li className={styles.listElement}>
              <img className={styles.img_link} src={users} alt='users' />
            </li>
            <span>Пользователи</span>
          </Link>

          <Link to='/' className={styles.link}>
            <li className={styles.listElement}>
              <img className={styles.img_link} src={events} alt='events' />
            </li>
            <span>Главная</span>
          </Link>
        </ul>
        <Link className={styles.link} to='/profile'>
          {/* <img
            className={styles.profile_bar}
            src={undefined}
            alt='icon'
          />{" "}
          <img
            className={styles.arrow_profile}
            src={top_arrow}
            alt=''
          /> */}
        </Link>
        <span>Профиль</span>
      </nav>
    </div>
  );
};
