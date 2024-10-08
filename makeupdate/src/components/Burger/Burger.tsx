import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Burger.module.scss";
import noUser from "./img/photo_undefined.svg";
import user from "./img/pussykiller.png";

// Types
import { BurgerAuth, ModalWindow } from "../../app/types/modal";
import { toast } from "react-toastify";
import {
  logoutProfile,
  removeTokenFromLocalStorage,
} from "helpers/localStorage.helper";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { logout } from "app/service/user/userSlice";

export const Burger: FC<ModalWindow & BurgerAuth> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const { isAuth, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  const access = localStorage.getItem("accessToken");
  const refresh = localStorage.getItem("refreshToken");
  console.log("123", userData);
  const photoLink = "https://api.lr45981.tw1.ru" + userData?.photo;
  const logOut = () => {
    if (!refresh && !access) {
      toast.error("Вы уже вышли с аккаунта");
    } else {
      logoutProfile();
      onClose();
      dispatch(logout());
      toast.success("Успешно!");
    }
  };

  return (
    <div className={styles.menu}>
      <ul className={styles.list}>
        <li className={styles.list_section}>
          {isAuth ? (
            <span>Вы авторизованы</span>
          ) : (
            <span>Вы посетитель</span>
          )}
        </li>

        <li className={styles.list_section}>Стать пользователем</li>
        <li className={styles.list_section}>Стать продавцом</li>
        <div className={styles.line}></div>

        <Link to='/profile' className={styles.list_section}>
          Настройки профиля
        </Link>
        <li onClick={onOpen} className={styles.list_section}>
          Добавить профиль
        </li>
        <div className={styles.line}></div>
        {isAuth && (
          <div className={styles.profile_section}>
            <div className={styles.box_img}>
              <img
                className={styles.prof_sec_img}
                src={photoLink}
                alt='profile_img'
              />
            </div>

            <span className={styles.prof_select}>
              {userData?.first_name ? userData.first_name : "Имя"}
            </span>
          </div>
        )}
        <div className={styles.profile_section}>
          <div className={styles.box_img}>
            <img
              className={styles.prof_sec_img}
              src={noUser}
              alt='profile_img'
            />
          </div>
          <span className={styles.prof_select}>Посетитель</span>
        </div>
        {isAuth && (
          <li className={styles.list_section} onClick={logOut}>
            Выйти из профиля
          </li>
        )}
      </ul>
    </div>
  );
};
