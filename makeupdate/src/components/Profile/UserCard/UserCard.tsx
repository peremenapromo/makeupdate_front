import styles from "./style.module.scss";
// Import image
import location from "../../../app/assets/users/location.svg";
import user from "../../../app/assets/users/motinova.png";
import video from "../../../app/assets/users/video.svg";
import view from "../../../app/assets/users/view.svg";
import { IFollower } from "app/types/type";

export const UserCard = ({ ...userData }: IFollower) => {

  const userDataUrl = userData.photo
    ? "https://api.lr45981.tw1.ru" + userData.photo
    : null;
    
  return (
    <div className={styles.box_user}>
      <img
        className={styles.user_img}
        src={userDataUrl! || user}
        alt='user_photo'
      />
      <div className={styles.line}></div>
      <div className={styles.container}>
        <p className={styles.name}>
          {userData.first_name && userData.last_name
            ? `${userData.first_name} ${userData.last_name}`
            : "Имя Фамилия"}
        </p>
        <p className={styles.location}>
          <img
            className={styles.image_location}
            src={location}
            alt='location_img'
          />
          {userData.country && userData.city
            ? `${userData.country} ${userData.city}`
            : "Страна, Город"}
        </p>
        <div className={styles.view_video}>
          <div className={styles.video}>
            <img src={video} alt='video_img' />
            <span className={styles.num}>12</span>
          </div>
          <div className={styles.view}>
            <img src={view} alt='view_img' />
            <span className={styles.num}>12333</span>
          </div>
        </div>
      </div>
    </div>
  );
};
