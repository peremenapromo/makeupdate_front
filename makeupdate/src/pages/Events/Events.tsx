import React from "react";
import s from "./style.module.scss";
import { BigCardEvent } from "components/EventsUi/BigCard";
import { Navigation } from "components/EventsUi/navigation";
import { CalendarEvents } from "components/EventsUi/Calendar";
import { SmallCardEvents } from "components/EventsUi/SmallCard";
export const Events = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.bigCardBlock}>
          <BigCardEvent />
          <BigCardEvent />
          <BigCardEvent />
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
