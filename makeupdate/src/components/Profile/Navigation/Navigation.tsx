import s from "./style.module.scss";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { UserProfileFollowers } from "../UserProfile/userProfileFollowers/UserProfileFollowers";

import { UserProfileFollowing } from "../UserProfile/userProfileFollowing/UserProfileFollowing";
import {
  getFavouriteLessonsList,
  getFollowers,
  getFollowing,
  getUsersLessons,
  getUsersProfileList,
} from "app/api/api";
import { UserProfileLessons } from "../UserProfile/userLessons/UserProfileLessons";
import { UserFavouriteLessons } from "../UserProfile/userFavouriteLessons/UserProfileFavouriteLessons";
import { ILesson } from "app/types/type";

export const NavigationProfile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeButton, setActiveButton] = useState<string | null>();
  const [activeButtonDesktop, setActiveButtonDesktop] = useState<
    number | null
  >(null);

  const { followers, following } = useSelector(
    (store) => store.profileCard,
  );
  const { userData } = useSelector((store) => store.user);
  const { userLesson, favouriteLessonsList } = useSelector(
    (store) => store.lessons,
  );

  const dispatch = useDispatch();

  const buttonsTop = [
    {
      text: "Мои уроки",
      count: userLesson?.count ? userLesson?.count : "13",
    },
    { text: "Доступ к урокам", count: 13 },
    {
      text: "Избранные уроки",
      count: favouriteLessonsList?.count
        ? favouriteLessonsList?.count
        : 13,
    },
    { text: "Мои события", count: 13 },
    { text: "Мое портфолио" },
    {
      text: "Подписчики",
      count: followers?.count ? followers?.count : 13,
    },
    {
      text: "Подписки",
      count: following?.count ? following?.count : 13,
    },
    { text: "Финансы" },
  ];

  const buttons = [
    {
      id: "lessons",
      label: "Мои уроки",
      count: userLesson?.count ? userLesson?.count : "13",
    },
    { id: "access", label: "Доступ к урокам", count: 13 },
    {
      id: "favourites",
      label: "Избранные уроки",
      count: favouriteLessonsList?.count
        ? favouriteLessonsList?.count
        : 13,
    },
    { id: "events", label: "Мои события", count: 13 },
    { id: "portfolio", label: "Мое портфолио" },
    {
      id: "subscribers",
      label: "Подписчики",
      count: followers?.count ? followers?.count : 13,
    },
    {
      id: "subscriptions",
      label: "Подписки",
      count: following?.count ? following?.count : 13,
    },
    { id: "finances", label: "Финансы" },
  ];
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  // Окончание перетаскивания
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartPos(
      e.touches[0].pageX - containerRef.current!.offsetLeft,
    );
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current!.offsetLeft;
    const walk = (x - startPos) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  // Перемещение мышью
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startPos) * 2;
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleButtonClick = async (id: string) => {
    setActiveButton(id);
    setActiveButtonDesktop(null);
    if (activeButton === id) return;

    if (id === "subscribers") {
      getFollowers(dispatch, userData?.user_id.toString()!);
    }
    if (id === "subscriptions") {
      getFollowing(dispatch, userData?.user_id.toString()!);
    }
    if (id === "subscriptions") {
      getFollowing(dispatch, userData?.user_id.toString()!);
    }
    if (id === "lessons") {
      getUsersLessons(dispatch, userData?.user_id.toString()!);
    }
  };

  const handleButtonClickDesktop = async (index: number) => {
    setActiveButtonDesktop(index);
    setActiveButton(null);
    if (activeButtonDesktop === index) return;

    if (buttons[index].label === "Подписчики") {
      await getFollowers(dispatch, userData?.user_id.toString()!);
    }
    if (buttons[index].label === "Подписки") {
      await getFollowing(dispatch, userData?.user_id.toString()!);
    }
    if (buttons[index].label === "Мои уроки") {
      await getUsersLessons(dispatch, userData?.user_id.toString()!);
    }
  };

  const buttonClass = (index: number) =>
    activeButtonDesktop === index
      ? `${s.button_main_profile} ${s.active}`
      : s.button_main_profile;

  return (
    <div className={s.buttons_page_profile}>
      <div className={s.buttons_containers_profile_top}>
        {buttonsTop.map((button, index) => (
          <button
            key={index}
            className={buttonClass(index)}
            onClick={() => handleButtonClickDesktop(index)}>
            <span className={s.button_main_profile_text}>
              {button.text}
              {button.count && (
                <sup className={s.sup}>({button.count})</sup>
              )}
            </span>
          </button>
        ))}
      </div>

      <div
        className={s.buttonsContainer}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}>
        <div className={s.buttons}>
          {buttons.map((button) => (
            <button
              key={button.id}
              className={`${s.button_main_profile} ${
                activeButton === button.id ? s.active : ""
              }`}
              onClick={() => handleButtonClick(button.id)}>
              <span className={s.button_main_profile_text}>
                {button.label}
                {button.count && (
                  <sup className={s.sup}>({button.count})</sup>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      {activeButtonDesktop === 5 && <UserProfileFollowers />}
      {activeButtonDesktop === 6 && <UserProfileFollowing />}
      {activeButtonDesktop === 0 && <UserProfileLessons />}
      {activeButtonDesktop === 2 && <UserFavouriteLessons />}
      {activeButton === "favourites" && <UserFavouriteLessons />}
      {activeButton === "lessons" && <UserProfileLessons />}
      {activeButton === "subscribers" && <UserProfileFollowers />}
      {activeButton === "subscriptions" && <UserProfileFollowing />}
    </div>
  );
};
