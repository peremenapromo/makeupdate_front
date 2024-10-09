import { FC, useEffect } from "react";
import styles from "./Profile.module.scss";
import ProfileCard from "../../components/Profile/Card/ProfileCard";
import profile_top from "../../app/assets/profileCard/profile_top.svg";
import bgMobile from "../../app/assets/profileCard/BgMobile.png";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { getDataUser } from "app/api/api";
import { NavigationProfile } from "components/Profile/Navigation/Navigation";
import { ProfileMobile } from "components/Profile/ProfileMobile";

export const Profile: FC = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await getDataUser(dispatch);
    };
    fetchData();
    // console.log(userData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={styles.profile_all_container}>
      <img
        className={styles.profile_top_img}
        src={profile_top}
        alt='profile_bg'
      />
      <img
        className={styles.profile_top_img_mobile}
        src={bgMobile}
        alt='profile_bg'
      />

      <div className={styles.profileContainer}>
        <ProfileCard />

        <NavigationProfile />
      </div>
      <div className={styles.profileContainerMobile}>
        <ProfileMobile
          userData={{ ...userData }}
          photoLink={"https://api.lr45981.tw1.ru/" + userData?.photo}
        />
      </div>
    </div>
  );
};
