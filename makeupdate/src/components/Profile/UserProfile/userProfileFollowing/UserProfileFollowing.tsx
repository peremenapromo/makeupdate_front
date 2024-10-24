import { useSelector } from "app/service/hooks/hooks";
import React from "react";
import s from "./style.module.scss";
import { Link } from "react-router-dom";
import { UserCard } from "components/Profile/UserCard/UserCard";
export const UserProfileFollowing = () => {
  const { following } = useSelector((store) => store.profileCard);
  const { userData } = useSelector((store) => store.user);


  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {following?.results.map((user, index) => (
          <div className={s.user} key={index}>
            <Link
              to={
                user.user_id === userData?.user_id
                  ? "/profile"
                  : `/profile/${user.user_id}`
              }>
              <UserCard {...user} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
