import { FC } from "react";
import { User } from "./User";
import styles from "./Users.module.scss";
// Import image
import img from "../../app/assets/users/filter.svg";
import search from "../../app/assets/users/search.svg";

export const Users: FC = () => {
  return (
    <div className={styles.container_users}>
      <header className={styles.header}></header>
      <div className={styles.inputs_container}>
        <div className={styles.searchName}>
          <img className={styles.vol} src={img} alt='' />
          <input
            className={styles.inputName}
            placeholder='Поиск по имени'
            type='text'
          />
          <img className={styles.search_img} src={search} alt='' />
        </div>
        <div className={styles.searchLocation}>
					<img className={styles.vol} src={img} alt='' />
					<input className={styles.inputLocation} placeholder='Поиск по местоположению' type='text' />
					<img className={styles.search_img} src={search} alt='' />
				</div>
        <div className={styles.searchSmall}>
					<img className={styles.vol} src={img} alt='' />
					<input className={styles.inputLocation} placeholder='Поиск...' type='text' />
					<img className={styles.search_img} src={search} alt='' />
				</div>
      </div>
      <div className={styles.users_box}>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};
