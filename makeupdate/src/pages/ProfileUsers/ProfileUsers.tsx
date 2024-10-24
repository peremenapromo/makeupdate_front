import { FC, useEffect } from "react";
import styles from "./Profile.module.scss";
import bgMobile from "../../app/assets/profileCard/BgMobile.png";
import { useDispatch } from "app/service/hooks/hooks";
import {
  getDataUserProfile,
  getFollowers,
  getFollowing,
  getUsersLessons,
} from "app/api/api";
import { useParams } from "react-router";
import { UserProfile } from "components/Profile/UserProfile/UserProfile";
import { UsersNavigationProfile } from "components/Profile/UsersNavigation/UsersNavigation";
import { UsersProfileMobile } from "components/Profile/UsersProfileMobile";

export const ProfileUsers: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      // await getFollowers(dispatch, id!);
      // await getFollowing(dispatch, id!);
      await getDataUserProfile(dispatch, id!);
      await getUsersLessons(dispatch, id!);
    };
    fetchData();
  }, [dispatch, id]);

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
        <UserProfile idLink={id || ""} />

        <UsersNavigationProfile />
      </div>
      <div className={styles.profileContainerMobile}>
        <UsersProfileMobile idLink={id || ""} />
      </div>
    </div>
  );
};
