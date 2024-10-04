import { FC, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import ProfileCard from "./ProfileCard/ProfileCard";
import profile_top from "../../app/assets/profileCard/profile_top.svg";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { getDataUser } from "app/api/api";

export const Profile: FC = () => {
  const [inputData, setInputData] = useState({
    name: "",
    surname: "",
  });
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await getDataUser(dispatch); // Передайте dispatch
    };
    fetchData();
    console.log(userData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleInputChange = (field: string, value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <div className={styles.profile_all_container}>
      <img
        className={styles.profile_top_img}
        src={profile_top}
        alt='profile_bg'
      />
      <div className={styles.username_box}>
        <p className={styles.username}>
          {userData?.first_name ? userData.first_name : "ИМЯ"}
        </p>
        <p className={styles.username}>
		{userData?.last_name ? userData.last_name : "ФАМИЛИЯ"}
        </p>
      </div>
      <ProfileCard />
      <div className={styles.buttons_page_profile}>
        <div className={styles.buttons_containers_profile}>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Мои уроки<sup className={styles.sup}>(13)</sup>
            </span>
          </button>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Доступ к урокам
              <sup className={styles.sup}>(13)</sup>
            </span>
          </button>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Избранные уроки
              <sup className={styles.sup}>(13)</sup>
            </span>
          </button>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Мои события<sup className={styles.sup}>(13)</sup>
            </span>
          </button>
        </div>
        <div className={styles.buttons_containers_profile}>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Мое портфолио
            </span>
          </button>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Подписчиким <sup className={styles.sup}>(13)</sup>
            </span>
          </button>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Подписки <sup className={styles.sup}>(13)</sup>
            </span>
          </button>
          <button className={styles.button_main_profile}>
            <span className={styles.button_main_profile_text}>
              Финансы
            </span>
          </button>
        </div>
        <div className={styles.buttons}></div>
      </div>
    </div>
  );
};
