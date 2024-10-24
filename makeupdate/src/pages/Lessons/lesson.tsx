import { FC, useEffect, useState } from "react";
// Import images
import channel from "../../app/assets/profileCard/unknown_user.svg";
import comment from "../../app/assets/lessons/comment.svg";
import lesson from "../../app/assets/lessons/lesson.svg";
import more from "../../app/assets/lessons/more_img.svg";
import play from "../../app/assets/lessons/play.svg";
import star from "../../app/assets/lessons/star.svg";
import view from "../../app/assets/lessons/view.svg";
import wallet from "../../app/assets/lessons/wallet.svg";
import styles from "./Lessons.module.scss";
import { LessonProps } from "app/types/type";
import { Link } from "react-router-dom";
import { ShareMenu } from "components/LessonsUi/ShareMenu";
import { useSelector } from "app/service/hooks/hooks";

export const Lesson = ({
  lessonData,
  profileData,
  currentId,
}: LessonProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [activeLesson, setActiveLesson] = useState<number | null>(
    null,
  );
  const { blacklist } = useSelector((state) => state.lessons);
  const toggleMenu = (lessonId: number) => {
    setActiveLesson(lessonId);
    setShowMenu(!showMenu);
    console.log(lessonId);
  };
  const closeMenu = () => setShowMenu(false);
  const name =
    profileData?.first_name && profileData?.last_name
      ? `${profileData.first_name} ${profileData.last_name}`
      : "Имя Фамилия";

  const convertSecondsToMinutes = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const publishedDate = new Date(
    lessonData!.published_date,
  ).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  let defaultUrl = "https://api.lr45981.tw1.ru";
  let photoUrl = profileData?.photo
    ? defaultUrl + profileData.photo
    : channel;

  let videoDuration = convertSecondsToMinutes(lessonData!.duration);

  return (
    <div className={styles.lesson}>
      <div className={styles.imageContainer}>
        {blacklist ? (
          <img
            className={styles.img_lesson}
            src={lessonData!.poster_url}
            alt='poster'
          />
        ) : (
          ""
        )}
        <button className={styles.button_play}>
          <img
            className={styles.play_img}
            src={play}
            alt='playVideoIcon'
          />
        </button>
        <div className={styles.time_box}>
          <div className={styles.time_lessons}>{videoDuration}</div>
        </div>
      </div>
      <div className={styles.name_les_btn_share}>
        <p className={styles.name_les}>{lessonData!.title}</p>
        <button
          className={styles.btn_share}
          onClick={() => {
            console.log("lessonData.id:", lessonData?.id);
            toggleMenu(lessonData?.id!);
          }}>
          <img
            className={styles.img_share}
            src={more}
            alt='ShareIcon'
          />
        </button>
        {currentId === lessonData?.user_id ? (
          <div className={styles.shareMenu}>
            {showMenu && activeLesson === lessonData?.id && (
              <ShareMenu
                closeMenu={closeMenu}
                myAccount={currentId === lessonData?.user_id}
              />
            )}
          </div>
        ) : (
          <div className={styles.shareMenu}>
            {showMenu && (
              <ShareMenu
                closeMenu={closeMenu}
                myAccount={false}
                lessonId={activeLesson!}
                isFavouriteLesson={lessonData?.is_favorite}
              />
            )}
          </div>
        )}
      </div>
      <p className={styles.date}>Опубликовано: {publishedDate}</p>
      <p className={styles.info}>{lessonData!.description}</p>
      <div className={styles.channel_box}>
        {window.location.pathname === "/profile1" ? (
          <button className={styles.editButton}>Редактировать</button>
        ) : (
          <>
            <Link
              to={
                currentId === lessonData?.user_id
                  ? "/profile"
                  : `/profile/${lessonData?.user_id}`
              }>
              <div className={styles.channel}>
                <img
                  className={styles.img_channel}
                  src={photoUrl}
                  alt='ChannelIcon'
                />

                <div className={styles.name_view_com}>
                  <p className={styles.name_channel}>
                    <span>{name}</span>
                    <img
                      className={styles.img_name}
                      src={star}
                      alt=''
                    />
                  </p>
                  <div className={styles.view_comm_box}>
                    <div className={styles.view_comment}>
                      <img
                        className={styles.img_view_com}
                        src={view}
                        alt=''
                      />
                      <span className={styles.num_view_com}>
                        {lessonData?.views}
                      </span>
                    </div>
                    <div className={styles.view_comment}>
                      <img
                        className={styles.img_view_com}
                        src={comment}
                        alt=''
                      />
                      <span className={styles.num_view_com}>
                        {lessonData?.count_comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </>
        )}

        {currentId !== lessonData?.user_id && (
          <button className={styles.buy_btn}>
            <img className={styles.img_buy} src={wallet} alt='' />
            <p className={styles.text_buy}>Купить за</p>
            <p className={styles.num_buy}>{lessonData?.price}₽</p>
          </button>
        )}
      </div>
    </div>
  );
};
