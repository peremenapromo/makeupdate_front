import { FC, useState } from "react";
import { Bounce, toast } from "react-toastify";

import { AuthService } from "../../app/service/servise";
import { login, setUserData } from "../../app/service/user/userSlice";
import styles from "./AuthFrm.module.scss";

// Import img
import { AuthForm as AuthFormType } from "../../app/types/modal";
import cross from "./cross.svg";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { IGetUserData, IUser } from "app/types/type";
import checkedIcon from "../../app/assets/other/checkedIcon.svg";
import { useLocation, useNavigate } from "react-router";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import { ConfirmEmailModal } from "components/ConfirmEmailModal";
import {
  setConfirmPassword,
  setEmail,
  setIsChecked,
  setIsConfirmEmail,
  setIsLogin,
  setPassword,
  setTelegram,
} from "app/service/auth/authSlice";
export const AuthForm: FC<AuthFormType> = ({ isOpen, onClose }) => {
  const {
    email,
    telegram,
    password,
    confirmPassword,
    isLogin,
    isConfirmEmail,
    isChecked,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getDataUser = async () => {
    try {
      const data = await axiosWithRefreshToken<IGetUserData>(
        "https://api.lr45981.tw1.ru/api/v1/profile/my-profile/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // console.log(data);
      dispatch(setUserData(data));
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  if (!isOpen) return null;
  const closeModal = () => {
    navigate("/");
    if (onClose) {
      onClose();
    }
  };
  const toggleForm = () => {
    dispatch(setIsLogin(!isLogin));
  };

  const registrationHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      console.log(password.valueOf());
      return;
    }
    try {
      const data = await AuthService.registration({
        email,
        password,
        telegram,
      });
      if (data) {
        localStorage.setItem("email", data.email);
        toast.success("Аккаунт успешно создан,проверьте почту");
        dispatch(setIsConfirmEmail(true));
      }
    } catch (error: any) {
      const err = error.response.data.email;
      console.log(err);
      toast.error(
        err?.toString() || "Ошибка при создании пользователя",
        {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        },
      );
    }
  };

  const loginHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      const data = await AuthService.login({
        email,
        password,
      });
      if (data) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        const from = location.state?.from?.pathname || "/";
        navigate(from);
        const user: IUser = { email, password };
        dispatch(login(user));
        toast.success("Ваш вход успешен");
        getDataUser();
        if (onClose) {
          onClose();
        }
      }
    } catch (error: any) {
      const err = error.response?.data.message;
      toast.error(err ? err.toString() : "Ошибка при входе", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const errorHandler = (e: any) => [
    e.preventDefault(),
    toast.error(
      "Вы не дали согласие на обработку персональных данных ",
      {
        position: "top-left",
      },
    ),
  ];
  return (
    <div className={styles.authWrapper}>
      <div
        className={isConfirmEmail ? styles.hidden : styles.box_auth}>
        <button onClick={closeModal} className={styles.closeModal}>
          <img src={cross} alt='close' />
        </button>
        <form
          onSubmit={
            !isLogin && !isChecked
              ? errorHandler
              : isLogin
              ? loginHandler
              : registrationHandler
          }
          className={styles.form}>
          <h1 className={styles.title}>
            {isLogin ? "ВХОД" : "РЕГИСТРАЦИЯ"}
          </h1>
          <div className={styles.inputs}>
            <input
              onChange={(e) => dispatch(setEmail(e.target.value))}
              id='email'
              className={styles.input_auth}
              placeholder='Почта'
              type='text'
              value={email}
            />
            {!isLogin && (
              <input
                onChange={(e) =>
                  dispatch(setTelegram(e.target.value))
                }
                id='username'
                className={styles.input_auth}
                placeholder='Телеграмм'
                type='text'
                value={telegram}
              />
            )}
            <input
              className={styles.input_auth}
              id='password'
              type='password'
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder='Пароль'
              value={password}
            />
            {!isLogin && (
              <input
                className={styles.input_auth}
                placeholder='Повторить пароль'
                type='password'
                onChange={(e) =>
                  dispatch(setConfirmPassword(e.target.value))
                }
                value={confirmPassword}
              />
            )}
          </div>
          {isLogin && (
            <button className={styles.reset_pass}>
              Забыли пароль?
            </button>
          )}
          {!isLogin && (
            <div className={styles.rules}>
              <button
                type='button'
                className={
                  isChecked ? styles.checked : styles.buttonCheckbox
                }
                onClick={() =>
                  dispatch(setIsChecked(!isChecked))
                }></button>
              <p>
                Я даю согласие на{" "}
                <span className={styles.gradientText}>
                  обработку своих персональных данных
                </span>{" "}
                и{" "}
                <span className={styles.gradientText}>
                  принимаю условия оферты
                </span>
              </p>
              {isChecked && (
                <img
                  onClick={() => dispatch(setIsChecked(!isChecked))}
                  src={checkedIcon}
                  alt='checkedIcon'
                  className={styles.checkedIcon}
                />
              )}
            </div>
          )}

          <button
            className={
              isChecked && !isLogin
                ? styles.send_form
                : isLogin
                ? styles.send_form
                : styles.nonActive
            }>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
          <p className={styles.question}>
            {isLogin ? "У вас нет аккаунта?" : "Уже есть аккаунт?"}
            <button
              type='button'
              onClick={toggleForm}
              className={styles.login_or_reg}>
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </form>
      </div>
      {isConfirmEmail && (
        <ConfirmEmailModal closeModal={closeModal} />
      )}
    </div>
  );
};
