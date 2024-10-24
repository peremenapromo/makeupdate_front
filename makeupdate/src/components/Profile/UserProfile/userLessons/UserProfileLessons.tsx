import { useDispatch, useSelector } from "app/service/hooks/hooks";
import React, { useEffect, useState } from "react";
import s from "./style.module.scss";

import { Lesson } from "pages/Lessons/lesson";
import { getDataUserProfile } from "app/api/api";
import { LessonForProfile } from "components/LessonsUi/LessonForProfile/LessonForProfile";
export const UserProfileLessons = () => {
  const { userLesson, profiles } = useSelector(
    (store) => store.lessons,
  );
  const { userData } = useSelector((store) => store.user);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData?.user_id) {
      setCurrentId(userData.user_id);
    }
  }, [userData?.user_id]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {userLesson?.count! > 0
          ? userLesson?.results.map((lesson, index) => (
              <LessonForProfile
                currentId={currentId!}
                lessonData={lesson}
                key={index}
                profileData={profiles[lesson.user_id] || null}
              />
            ))
          : "Уроков нет"}
      </div>
    </div>
  );
};
