import { useEffect } from "react";
import styles from "./style.module.scss";
import location from "../../../app/assets/profileCard/location.svg";
import videos from "../../../app/assets/profileCard/videos.svg";
import view from "../../../app/assets/profileCard/view.svg";
import {
  getCounterProfile,
  getDataUserProfile,
  setIsFollow,
  setIsUnFollow,
} from "app/api/api";

import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { toast } from "react-toastify";
import { UpdateProfilePhoto } from "components/Profile/LoadPhoto/LoadPhoto";
import telegram from "../../../app/assets/profileCard/Telegram.svg";
import phone from "../../../app/assets/profileCard/Phone.svg";
import WhatsApp from "../../../app/assets/profileCard/WhatsApp.svg";

import {
  setActiveButton,
  setSubscribe,
} from "app/service/profileCard/profileCardSlice";

interface ProfileCardProps {
  idLink: string;
}
export const UserProfile = ({ idLink }: ProfileCardProps) => {
  const { profileData, subscribe, counter } = useSelector(
    (state) => state.profileCard,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await getDataUserProfile(dispatch, idLink);
      await getCounterProfile(dispatch, idLink);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const savedButton = localStorage.getItem("activeButton");
    if (savedButton) {
      dispatch(setActiveButton(savedButton));
    }
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      dispatch(setSubscribe(profileData.is_subscribed));
    }
  }, [profileData]);

  const handleFollow = async () => {
    try {
      await setIsFollow(idLink);
      dispatch(setSubscribe(true));
    } catch (error) {
      toast.error("Ошибка при подписке.");
    }
  };

  const handleUnfollow = async () => {
    try {
      await setIsUnFollow(idLink);
      dispatch(setSubscribe(false));
    } catch (error) {
      toast.error("Ошибка при отписке.");
    }
  };

  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_img_box}>
        <UpdateProfilePhoto
          initialPhotoUrl={
            profileData?.photo ? profileData.photo : ""
          }
        />
      </div>
      <div className={styles.username_box}>
        {profileData && (
          <div className={styles.username}>
            <span>
              {profileData?.first_name
                ? profileData?.first_name.toUpperCase()
                : "ИМЯ"}{" "}
            </span>{" "}
            <span>
              {profileData?.last_name
                ? profileData?.last_name.toUpperCase()
                : "ФАМИЛИЯ"}
            </span>
          </div>
        )}
      </div>

      <div className={styles.containerInfo}>
        <div className={styles.box_loc_vid_view}>
          <p className={styles.location}>
            <img
              className={styles.location_img}
              src={location}
              alt='location_icon'
            />
            <span className={styles.locationText}>
              {profileData?.city && profileData?.country
                ? `${profileData.city}, ${profileData.country}`
                : "Не задано"}
            </span>
          </p>
          <div className={styles.videos_view}>
            <p className={styles.vid_see}>
              <img
                className={styles.vid_see_img}
                src={view}
                alt='view_icon'
              />
              {counter ? counter[0].total_views : 0}
            </p>
            <p className={styles.vid_see}>
              <img
                className={styles.vid_see_img}
                src={videos}
                alt='videos_icon'
              />
              {counter ? counter[0].count_lessons : 0}
            </p>
          </div>
        </div>
        <div className={styles.buttonsContainerUserProfile}>
          <button className={styles.usersSocialButton}>
            Telegram
            <img src={telegram} alt='telegram' />
          </button>
          <button className={styles.usersSocialButton}>
            WhatsApp
            <img src={WhatsApp} alt='whatsapp' />
          </button>
          <button className={styles.usersSocialButton}>
            Позвонить <img src={phone} alt='phone' />
          </button>

          {subscribe ? (
            <button
              className={styles.isSubscribed}
              onClick={handleUnfollow}>
              Вы подписаны
            </button>
          ) : (
            <button
              className={styles.subscribe}
              onClick={handleFollow}>
              Подписаться
            </button>
          )}
        </div>
        <div className={styles.info_me}>
          <h3 className={styles.title_me}>Обо мне:</h3>

          <p className={styles.text_me}>
            {" "}
            {profileData?.description
              ? profileData?.description
              : "Заполнить описание"}
          </p>
        </div>
      </div>
    </div>
  );
};
