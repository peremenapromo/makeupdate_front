import React, { useRef } from "react";
import s from "./style.module.scss";
import { BigCardEvent } from "components/EventsUi/BigCard";
import { Navigation } from "components/EventsUi/navigation";
import { CalendarEvents } from "components/EventsUi/Calendar";
import { SmallCardEvents } from "components/EventsUi/SmallCard";
import rightArrow from "../../app/assets/events/rightArrow.svg";
import leftArrow from "../../app/assets/events/leftArrow.svg";
import { useSwipeable } from "react-swipeable";

export const Events = () => {
  const cardBlockRef = useRef<HTMLDivElement>(null);
  const handleScrollRight = () => {
    if (cardBlockRef.current) {
      cardBlockRef.current.scrollLeft += 410;
    }
  };
  const handleScrollLeft = () => {
    if (cardBlockRef.current) {
      cardBlockRef.current.scrollLeft -= 500;
    }
  };
  const handleSwipeRight = () => {
    if (cardBlockRef.current) {
      cardBlockRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleSwipeLeft = () => {
    if (cardBlockRef.current) {
      cardBlockRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.topBlock} {...swipeHandlers}>
          <button
            className={s.navButtonLeft}
            onClick={handleScrollLeft}>
            <img src={leftArrow} alt='' />
          </button>
          <div className={s.bigCardBlock} ref={cardBlockRef}>
            <BigCardEvent />
            <BigCardEvent />
            <BigCardEvent />
          </div>
          <button className={s.navButton} onClick={handleScrollRight}>
            <img src={rightArrow} alt='' />
          </button>
        </div>
        <nav className={s.navigation}>
          <Navigation />
        </nav>
        <div className={s.calendar}>
          <CalendarEvents />
        </div>
        <div className={s.smallCardEvent}>
          <SmallCardEvents />
          <SmallCardEvents />
          <SmallCardEvents />
          <SmallCardEvents />
        </div>
      </div>
    </div>
  );
};
