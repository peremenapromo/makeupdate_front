import { FC, useEffect, useState } from "react";

import img from "../../app/assets/lessons/img.svg";
import search from "../../app/assets/lessons/search.svg";
import { Lesson } from "./lesson";
import styles from "./Lessons.module.scss";
import {
  getDataUserProfile,
  getDataUserProfileForLessons,
  getLessons,
  getUsersProfileList,
} from "app/api/api";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import {
  setActiveFilter,
  setProfileDataLessons,
} from "app/service/lessons/lessonsSlice";
import { ILesson, IUsersProfiles } from "app/types/type";

const CustomSelect = () => {
  const { activeFilter, usersProfiles } = useSelector(
    (store) => store.lessons,
  );

  const dispatch = useDispatch();
  const toggleFilter = (option: "popularity" | "date") => {
    dispatch(setActiveFilter(option));
  };
  return (
    <div className={styles.wrapperCustomSelect}>
      <button
        className={`${styles.custom_select} ${
          activeFilter === "popularity" ? styles.active : ""
        }`}
        onClick={() => toggleFilter("popularity")}>
        По популярности
      </button>
      <button
        className={`${styles.custom_select} ${
          activeFilter === "date" ? styles.active : ""
        }`}
        onClick={() => toggleFilter("date")}>
        По дате публикации
      </button>
    </div>
  );
};

export const Lessons: FC = () => {
  const dispatch = useDispatch();
  const { lessons, profiles, activeFilter, usersProfiles } =
    useSelector((store) => store.lessons);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((store) => store.user);
  console.log(activeFilter);
  const filteredLessons = (lessons?.results ?? [])
    .slice()
    .sort((a: ILesson, b: ILesson) => {
      if (activeFilter === "popularity") {
        return b.views - a.views;
      } else if (activeFilter === "date") {
        return (
          new Date(b.published_date).getTime() -
          new Date(a.published_date).getTime()
        );
      }
      return 0;
    });
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        await getLessons(dispatch);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке избранных уроков:", error);
        setLoading(false);
      }
    };
    fetchLessons();
  }, [dispatch]);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!loading && lessons?.results) {
        const uniqueUserIds = new Set<number>();
        lessons.results.forEach((lesson: ILesson) => {
          uniqueUserIds.add(lesson.user_id);
        });
        const userIdArray = Array.from(uniqueUserIds);

        if (userIdArray.length === 0) return;
        const idsString = userIdArray.join(",");
        // Запрашиваем профили только для новых уникальных пользователей
        // for (const user_id of userIdArray) {
        getUsersProfileList(dispatch, idsString); // Получаем данные профиля
        // }
      }
    };
    fetchProfiles();
  }, [lessons, loading, dispatch]); // Запускаем только при изменении уроков
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    // Проверяем, если profileData существует, обновляем currentId
    if (userData?.user_id) {
      setCurrentId(userData.user_id);
    }
  }, [userData?.user_id]);
  console.log(currentId);
  const profilesMap = Array.isArray(usersProfiles)
    ? usersProfiles.reduce(
        (
          acc: Record<number, IUsersProfiles>,
          profile: IUsersProfiles,
        ) => {
          acc[profile.user_id] = profile;
          return acc;
        },
        {},
      )
    : {};
  return (
    <div className={styles.lessons_container}>
      <div className={styles.filter_block}>
        <div className={styles.search_filter}>
          <div className={styles.filter}>
            <CustomSelect />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.search}>
              <img className={styles.vol} src={img} alt='' />
              <input
                className={styles.input}
                placeholder='Поиск'
                type='text'
              />
              <img
                className={styles.search_img}
                src={search}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.all_lessons_box}>
        {filteredLessons?.map((lesson: ILesson) => (
          <Lesson
            currentId={currentId!}
            key={lesson.id}
            lessonData={lesson}
            profileData={profilesMap[lesson.user_id] || null}
          />
        ))}
      </div>
    </div>
  );
};
