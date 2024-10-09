import React, { useState } from "react";
import s from "./style.module.scss";
import rightArrow from "../../../app/assets/events/rightArrow.svg";
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const CalendarEvents: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().getMonth(),
  );

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayAbbr = (date: Date) => {
    return date.toLocaleString("ru-RU", { weekday: "short" });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) =>
      prevMonth === 0 ? 11 : prevMonth - 1,
    );
  };

  return (
    <div className={s.calendarWrapper}>
      <div className={s.calendarContainer}>
        <div key={currentMonth} className={s.monthContainer}>
          <div className={s.monthName}>{months[currentMonth]}</div>
          <div className={s.daysContainer}>
            {Array.from({
              length: getDaysInMonth(currentMonth, 2024),
            }).map((_, day) => (
              <div key={day} className={s.day}>
                <div
                  className={`${s.dayAbbr} ${
                    new Date(2024, currentMonth, day + 1).getDay() ===
                    0
                      ? s.red
                      : ""
                  }`}>
                  {getDayAbbr(new Date(2024, currentMonth, day + 1))}
                </div>
                <div className={s.dayNumber}>{day + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className={s.navButton} onClick={handleNextMonth}>
        <img src={rightArrow} alt='' />
      </button>
    </div>
  );
};
