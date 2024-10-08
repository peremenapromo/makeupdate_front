import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import img
import arrow_bottom from "../../app/assets/other/arrow_bottom.svg";
import arrow_top from "../../app/assets/other/arrow_top.svg";
import burger_img from "../../app/assets/other/burger.svg";
import english_lang from "../../app/assets/other/english_lang.svg";
import events from "../../app/assets/other/events.svg";
import eventsActitve from "../../app/assets/other/eventsActitve.svg";
import home from "../../app/assets/other/home.svg";
import homeActive from "../../app/assets/other/homeActive.svg";
import lessonsActive from "../../app/assets/other/lessonsActive.svg";
import language_rus from "../../app/assets/other/language_rus.svg";
import lessons from "../../app/assets/other/lessons.svg";
import notification from "../../app/assets/other/notification.svg";
import users from "../../app/assets/other/people.svg";
import usersActive from "../../app/assets/other/peopleActive.svg";
import icon_profile from "../../app/assets/other/profile_icon.svg";

// Types and styles
import { HeaderProps } from "../../app/types/modal";
// import { InfoModal } from "../InfoModal/InfoModal";
import styles from "./Header.module.scss";
import { Burger } from "components/Burger/Burger";
import { useSelector } from "app/service/hooks/hooks";

const translations = {
  ru: {
    title: "MAKEUPDATE",
    links: [
      {
        to: "/",
        img: home,
        img_active: homeActive,
        label: "Главная",
      },
      {
        to: "/lessons",
        img: lessons,
        img_active: lessonsActive,
        label: "Уроки",
      },
      {
        to: "/users",
        img: users,
        img_active: usersActive,
        label: "Пользователи",
      },
      {
        to: "/events",
        img: events,
        img_active: eventsActitve,
        label: "События",
      },
    ],
  },
  en: {
    title: "MAKEUPDATE",
    links: [
      { to: "/", img: home, img_active: homeActive, label: "Home" },
      {
        to: "/lessons",
        img: lessons,
        img_active: lessonsActive,
        label: "Lessons",
      },
      {
        to: "/users",
        img: users,
        img_active: usersActive,
        label: "Users",
      },
      {
        to: "/events",
        img: events,
        img_active: eventsActitve,
        label: "Events",
      },
    ],
  },
};

export const Header: FC<HeaderProps> = ({
  onOpen,
  onOpenAuth,
  isOpenBurger,
  onClose,
}) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>("");
  const [language, setLanguage] = useState<"ru" | "en">("ru");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isArrowUp, setIsArrowUp] = useState<boolean>(false);
  const { userData } = useSelector((store) => store.user);
  const photoLink = "https://api.lr45981.tw1.ru" + userData?.photo;
  const toggleArrow = () => {
    setIsArrowUp((prev) => !prev); // Переключаем состояние стрелки
  };

  const handleCloseModal = () => {};

  useEffect(() => {
    const savedActiveLink = localStorage.getItem("activeLink");
    if (savedActiveLink) {
      setActiveLink(savedActiveLink);
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    setActiveLink(location.pathname);
    localStorage.setItem("activeLink", location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    localStorage.setItem("activeLink", link);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ru" ? "en" : "ru"));
  };

  // Styles header on route
  const shouldShowBackground = [
    "/users",
    "/lessons",
    "/events",
    "/menu",
    "/login",
    "*",
  ].includes(location.pathname);

  return (
    <div
      className={
        shouldShowBackground
          ? styles.headerWithBackground
          : styles.header
      }>
      <div className={styles.containerHeader}>
        <h1 className={styles.title}>
          {translations[language].title}{" "}
        </h1>
        <div className={styles.links}>
          {translations[language].links.map((link) => (
            <Link
              key={link.to}
              className={`${styles.link} ${
                location.pathname === link.to ? styles.active : ""
              }`}
              to={link.to}
              onClick={() => handleLinkClick(link.to)}>
              <img
                src={
                  activeLink === link.to ? link.img_active : link.img
                }
                alt={link.label}
                className={styles.img_links}
              />
              <span
                className={
                  activeLink === link.to
                    ? styles.activeText
                    : styles.text
                }>
                {link.label}
              </span>
            </Link>
          ))}
        </div>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <img
              className={styles.image_radius}
              src={notification}
              alt=''
            />
          </button>
          <button className={styles.button} onClick={toggleLanguage}>
            <img
              className={styles.img_language}
              src={language === "ru" ? language_rus : english_lang}
              alt='Change Language'
            />
          </button>
          <div
            onClick={() => {
              toggleArrow();
              onOpen();
            }}
            className={
              isModalOpen
                ? styles.active_button_profile
                : styles.button_profile
            }>
            {userData && photoLink ? (
              <img
                className={styles.img_icon}
                src={photoLink}
                alt='icon_profile'
              />
            ) : (
              <img
                className={styles.img_icon}
                src={icon_profile}
                alt='icon_profile'
              />
            )}
            <img
              className={styles.arrow}
              src={isArrowUp ? arrow_top : arrow_bottom}
              alt='arrow'
            />
            {isOpenBurger && (
              // <div className={styles.overlay} onClick={handleOverlayClick}>
              <div className={styles.burger}>
                <Burger
                  onOpen={onOpenAuth}
                  isOpen={isOpenBurger}
                  onClose={handleCloseModal}
                />
              </div>
              // </div>
            )}
          </div>
          {/* <button className={styles.button}>
            <img src={burger_img} alt='burger_button' />
            <InfoModal
              isOpen={isOpenBurger}
              onClose={handleCloseModal}
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};
