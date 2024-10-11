import React, { useState } from "react";
import s from "./style.module.scss";
import search from "../../../app/assets/events/searchIcon.svg";
import searchGradient from "../../../app/assets/events/searchGradient.svg";
import img from "../../../app/assets/users/filter.svg";
export const Navigation = () => {
  const [activeButton, setAcitveButton] = useState<number>(1);
  const buttons = [
    {
      title: "События мира",
      id: 1,
    },
    {
      title: "События страны",
      id: 2,
    },
    {
      title: "События города",
      id: 3,
    },
  ];

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.leftSide}>
          {buttons.map((el) => (
            <button
              key={el.id}
              className={activeButton === el.id ? s.active : s.button}
              onClick={() => setAcitveButton(el.id)}>
              {el.title}
            </button>
          ))}
        </div>
        <div className={s.rightSide}>
          <img
            src={search}
            alt='searchIcon'
            className={s.searchIcon}
          />
          <img
            src={img}
            alt='mobileIcon'
            className={s.mobileInputIcon}
          />
          <input
            type='search'
            className={s.search}
            placeholder='Поиск...'
          />
          <img
            src={searchGradient}
            alt='searchGradient'
            className={s.gradientSearch}
          />
        </div>
      </div>
    </div>
  );
};
