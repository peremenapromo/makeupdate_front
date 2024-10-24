import s from "./style.module.scss";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { UserProfileFollowers } from "../UserProfile/userProfileFollowers/UserProfileFollowers";
import { UserProfileFollowing } from "../UserProfile/userProfileFollowing/UserProfileFollowing";
import { getFollowers, getFollowing } from "app/api/api";
import { UserProfileLessons } from "../UserProfile/userLessons/UserProfileLessons";

export const UsersNavigationProfile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeButton, setActiveButton] = useState<string | null>(
    "lessons",
  );
  const [activeButtonDesktop, setActiveButtonDesktop] = useState<
    number | null
  >(null);
  const { followers, following, profileData } = useSelector(
    (store) => store.profileCard,
  );
  const { userLesson } = useSelector((store) => store.lessons);
  const buttonsTop = [
    {
      text: "Уроки",
      count: userLesson?.count ? userLesson?.count : "13",
    },
    { text: "События", count: 13 },
    { text: "Портфолио" },
    {
      text: "Подписчики",
      count: followers?.count ? followers!.count : 13,
    },
    {
      text: "Подписки",
      count: following?.count ? following.count : 13,
    },
  ];
  const buttons = [
    { id: "lessons", label: "Уроки", count: 13 },
    { id: "events", label: "События", count: 13 },
    { id: "portfolio", label: "Портфолио" },
    {
      id: "subscribers",
      label: "Подписчики",
      count: followers?.count ? followers!.count : 13,
    },
    {
      id: "subscriptions",
      label: "Подписки",
      count: following?.count ? following.count : 13,
    },
  ];

  const handleButtonClick = (id: string) => {
    setActiveButton(id);
    setActiveButtonDesktop(null);
    if (id === "subscribers") {
      getFollowers(dispatch, profileData?.user_id.toString()!);
    }
    if (id === "subscriptions") {
      getFollowing(dispatch, profileData?.user_id.toString()!);
    }
  };
  // Обработка нажатия для десктопной версии
  const handleButtonClickDesktop = (index: number) => {
    setActiveButtonDesktop(index);
    setActiveButton(null);
    // Вызов нужного запроса по нажатию
    if (buttons[index]?.label === "Подписчики") {
      getFollowers(dispatch, profileData?.user_id.toString()!);
    }
    if (buttons[index]?.label === "Подписки") {
      getFollowing(dispatch, profileData?.user_id.toString()!);
    }
  };

  // Начало перетаскивания
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
  const dispatch = useDispatch();

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
      {activeButtonDesktop === 3 && <UserProfileFollowers />}
      {activeButton === "subscribers" && <UserProfileFollowers />}
      {activeButtonDesktop === 4 && <UserProfileFollowing />}
      {activeButton === "subscriptions" && <UserProfileFollowing />}
      {activeButtonDesktop === 0 && <UserProfileLessons />}
      {activeButton === "lessons" && <UserProfileLessons />}
    </div>
  );
};
