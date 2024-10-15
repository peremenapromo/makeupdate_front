import { FC } from "react";
import styles from "./Home.module.scss";
import lessons from "../../app/assets/home/lessons.svg";
import users from "../../app/assets/home/users.svg";
export const Home: FC = () => {
  return (
    <div className={styles.container}>
      <section className={styles.text_box_home}>
        <h1 className={styles.title}>MAKEUPDATE</h1>
        <h2 className={styles.subtitle}>
          СМОТРИ И ПРОДАВАЙ УРОКИ ПО МАКИЯЖУ В ЛЮБОЙ ТОЧКЕ МИРА НА
          ЛЮБОМ ЦИФРОВОМ УСТРОЙСТВЕ И УДОБНОМ ЯЗЫКЕ
        </h2>
      </section>
      <div className={styles.lessons_users_box}>
        <div className={styles.les_us}>
          <img
            className={styles.img_les_us}
            src={lessons}
            alt='lessons_icon'
          />
          <span className={styles.les_us_text}> Уроки</span>
          <span className={styles.num}>12000</span>
        </div>
        <div className={styles.les_us}>
          <span className={styles.les_us_text}>Пользователи</span>
          <span className={styles.num}>12000</span>
          <img
            className={styles.img_les_us}
            src={users}
            alt='users_icon'
          />
        </div>
      </div>
    </div>
  );
};
