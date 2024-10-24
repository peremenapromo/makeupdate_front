import React, { useEffect, useRef, useState } from "react";
import s from "./style.module.scss";
import share from "../../app/assets/lessons/share.svg";
import notIntresting from "../../app/assets/lessons/NotShowIcon.svg";
import favourite from "../../app/assets/lessons/123.svg";
import complaint from "../../app/assets/lessons/complaint.svg";
import {
  addFavouriteLesson,
  deleteFavouriteLesson,
  getLessons,
} from "app/api/api";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import {  
  addLessonToBlacklist,
  setFavouriteLessonsList,
} from "app/service/lessons/lessonsSlice";
import { ILesson } from "app/types/type";

export const ShareMenu = ({
  closeMenu,
  myAccount,
  lessonId,
  isFavouriteLesson,
}: {
  closeMenu: () => void;
  myAccount: boolean;
  lessonId?: number;
  isFavouriteLesson?: boolean;
}) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { favouriteLessonsList } = useSelector(
    (state) => state.lessons,
  );
  const [isFavouriteLessonId, setIsFavouriteLessonId] = useState<
    boolean | null
  >(isFavouriteLesson!);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu]);

  const addInBlackList = () => {
    // dispatch(addLessonToBlacklist());
  };

  const addFavouriteVideo = async () => {
    await addFavouriteLesson(dispatch, lessonId!);
    setIsFavouriteLessonId(true);
  };
  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await deleteFavouriteLesson(lessonId);
      if (favouriteLessonsList?.results) {
        dispatch(
          setFavouriteLessonsList({
            ...favouriteLessonsList,
            results: favouriteLessonsList.results.filter(
              (lesson: ILesson) => lesson.id !== lessonId,
            ),
          }),
        );
      }
    } catch (error) {
      console.error(
        "Ошибка при удалении урока из избранного:",
        error,
      );
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.container} ref={containerRef}>
        <ul className={s.list}>
          {!myAccount ? (
            <>
              {isFavouriteLessonId ? (
                <li
                  className={s.listElement}
                  onClick={() => handleDeleteLesson(lessonId!)}>
                  <img src={favourite} alt='FavouriteIcon' />
                  <span>Убрать</span>
                </li>
              ) : (
                <li
                  className={s.listElement}
                  onClick={addFavouriteVideo}>
                  <img src={favourite} alt='FavouriteIcon' />
                  <span>В избранное</span>
                </li>
              )}
              <li className={s.listElement}>
                <img src={share} alt='ShareIcon' />
                <span>Поделиться</span>
              </li>
              <li className={s.listElement} onClick={addInBlackList}>
                <img src={notIntresting} alt='notIntrestingIcon' />
                <span>Не интересно</span>
              </li>
              <li className={s.listElement}>
                <img src={complaint} alt='' />
                <span>Пожаловаться</span>
              </li>
            </>
          ) : (
            <>
              <li className={s.listElement}>
                <img src={share} alt='ShareIcon' />
                <span>Поделиться</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
