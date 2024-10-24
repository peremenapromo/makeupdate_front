import { FC, useEffect } from "react";
import styles from "./Profile.module.scss";
import ProfileCard from "../../components/Profile/Card/ProfileCard";
// import profile_top from "../../app/assets/profileCard/profile_top.svg";
import bgMobile from "../../app/assets/profileCard/BgMobile.png";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import {
  getDataUser,
  getDataUserProfile,
  getFollowers,
  getFollowing,
  getUsersLessons,
} from "app/api/api";
import { NavigationProfile } from "components/Profile/Navigation/Navigation";
import { ProfileMobile } from "components/Profile/ProfileMobile";
import { useParams } from "react-router";

export const Profile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await getDataUserProfile(
        dispatch,
        userData?.user_id.toString()!,
      );
    };
    fetchData();
  }, [dispatch, id, userData?.user_id]);
  return (
    <div className={styles.profile_all_container}>
      <img
        className={styles.profile_top_img}
        src={bgMobile}
        alt='profile_bg'
      />
      <img
        className={styles.profile_top_img_mobile}
        src={bgMobile}
        alt='profile_bg'
      />

      <div className={styles.profileContainer}>
        <ProfileCard idLink={id || ""} />

        <NavigationProfile />
      </div>
      <div className={styles.profileContainerMobile}>
        <ProfileMobile />
      </div>
    </div>
  );
};
