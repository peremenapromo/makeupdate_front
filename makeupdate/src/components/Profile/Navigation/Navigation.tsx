import s from "./style.module.scss";
import React, { useRef, useState } from "react";

export const NavigationProfile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const buttons = [
    { id: "lessons", label: "Мои уроки", count: 13 },
    { id: "access", label: "Доступ к урокам", count: 13 },
    { id: "favorites", label: "Избранные уроки", count: 13 },
    { id: "events", label: "Мои события", count: 13 },
    { id: "portfolio", label: "Мое портфолио" },
    { id: "subscribers", label: "Подписчики", count: 13 },
    { id: "subscriptions", label: "Подписки", count: 13 },
    { id: "finances", label: "Финансы" },
  ];

  const [activeButton, setActiveButton] = useState<string | null>(
    "lessons",
  );

  const handleButtonClick = (id: string) => {
    setActiveButton(id);
  };
  const [activeButtonDesktop, setActiveButtonDesktop] = useState<
    number | null
  >(0);

  const handleButtonClickDesktop = (index: number) => {
    setActiveButtonDesktop(index);
  };

  const buttonsTop = [
    { text: "Мои уроки", count: 13 },
    { text: "Доступ к урокам", count: 13 },
    { text: "Избранные уроки", count: 13 },
    { text: "Мои события", count: 13 },
  ];

  const buttonsBottom = [
    { text: "Мое портфолио" },
    { text: "Подписчики", count: 13 },
    { text: "Подписки", count: 13 },
    { text: "Финансы" },
  ];

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

      {/* Нижние кнопки */}
      <div className={s.buttons_containers_profile_bottom}>
        {buttonsBottom.map((button, index) => (
          <button
            key={index + buttonsTop.length}
            className={buttonClass(index + buttonsTop.length)}
            onClick={() =>
              handleButtonClickDesktop(index + buttonsTop.length)
            }>
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
    </div>
  );
};
