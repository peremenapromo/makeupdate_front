"use client";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Import img
import arrow_bottom from "../../app/assets/other/arrow_bottom.svg";
import arrow_top from "../../app/assets/other/arrow_top.svg";
import burger_img from "../../app/assets/other/burger.svg";
import english_lang from "../../app/assets/other/english_lang.svg";
import events from "../../app/assets/other/events.svg";
import home from "../../app/assets/other/home.svg";
import language_rus from "../../app/assets/other/language_rus.svg";
import lessons from "../../app/assets/other/lessons.svg";
import notification from "../../app/assets/other/notification.svg";
import users from "../../app/assets/other/people.svg";
import icon_profile from "../../app/assets/other/profile_icon.svg";
// Active img

// Type header

// Styles
import { HeaderProps } from "../../app/types/modal";
import { InfoModal } from "../InfoModal/InfoModal";
import styles from "./Header.module.scss";

import { isTokenExpired } from "helpers/localStorage.helper";

// TranslateHeader
const translations = {
  ru: {
    title: "MAKEUPDATE",
    links: [
      { to: "/", img: home, label: "Главная" },
      { to: "/lessons", img: lessons, label: "Уроки" },
      { to: "/users", img: users, label: "Пользователи" },
      { to: "/events", img: events, label: "События" },
    ],
  },
  en: {
    title: "MAKEUPDATE",
    links: [
      { to: "/", img: home, label: "Home" },
      { to: "/lessons", img: lessons, label: "Lessons" },
      { to: "/users", img: users, label: "Users" },
      { to: "/events", img: events, label: "Events" },
    ],
  },
};

export const Header: FC<HeaderProps> = ({ onOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>("");
  const [language, setLanguage] = useState<"ru" | "en">("ru");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isArrowUp, setIsArrowUp] = useState<boolean>(false);

  const toggleArrow = () => {
    setIsArrowUp((prev) => !prev); // Переключаем состояние стрелки
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const savedActiveLink = localStorage.getItem("activeLink");
    if (savedActiveLink) {
      setActiveLink(savedActiveLink);
    } else {
      setActiveLink(location.pathname);
    }
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
    "*",
  ].includes(location.pathname);

  return (
    <div
      className={
        shouldShowBackground
          ? styles.headerWithBackground
          : styles.header
      }>
      <h1 className={styles.title}>
        {translations[language].title}{" "}
      </h1>
      <div className={styles.links}>
        {translations[language].links.map((link) => (
          <Link
            key={link.to}
            className={`${styles.link} ${
              activeLink === link.to ? styles.active : ""
            }`}
            to={link.to}
            onClick={() => handleLinkClick(link.to)}>
            <img
              src={link.img}
              alt={link.label}
              className={styles.img_links}
            />
            <span
              className={
                activeLink === link.to ? styles.activeText : ""
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
          <img
            className={styles.img_icon}
            src={icon_profile}
            alt='icon_profile'
          />
          <img
            src={isArrowUp ? arrow_top : arrow_bottom}
            alt='arrow'
          />
        </div>
        <button className={styles.button}>
          <img src={burger_img} alt='burger_button' />
          <InfoModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </button>
      </div>
    </div>
  );
};
