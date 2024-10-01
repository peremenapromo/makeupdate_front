import { FC, useState } from "react";
import { Bounce, toast } from "react-toastify";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../helpers/localStorage.helper";

import { AuthService } from "../../app/service/servise";
import { login } from "../../app/service/user/userSlice";
import styles from "./AuthFrm.module.scss";

// Import img
import { AuthForm as AuthFormType } from "../../app/types/modal";
import { Checkbox } from "../Chekcbox/Checkbox";
import cross from "./cross.svg";
import { useDispatch } from "app/service/hooks/hooks";
import { IUser } from "app/types/type";
import checkedIcon from "../../app/assets/other/checkedIcon.svg";
export const AuthForm: FC<AuthFormType> = ({ isOpen, onClose }) => {
  // Checkbox
  const [isChecked, setIsChecked] = useState<boolean>(false);
  console.log(isChecked);
  // Inputs Form
  const [email, setEmail] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // Confirm password
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // Check authorized
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleCheckboxChange = (checked: boolean) => {
    console.log("Checkbox state changed to:", checked);
    setIsChecked(checked);
  };

  if (!isOpen) return null;

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
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
        toast.success("Account created");
        setIsLogin(true);
      }
    } catch (error: any) {
      const err = error.response?.data.message;
      toast.error(
        err?.toString() || "Ошибка при создании пользователя",
        {
          position: "top-right",
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
        setTokenToLocalStorage("accessToken", data.access);
        setTokenToLocalStorage("refreshToken", data.refresh);
        const user: IUser = { email, password };
        dispatch(login(user));
        toast.success("Ваш вход успешен");
      }
    } catch (error: any) {
      const err = error.response?.data.message;
      toast.error(err ? err.toString() : "Ошибка при входе", {
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

  // const handleCheckboxChange = () => {
  // 	setIsChecked(!isChecked)
  // }

  return (
    <div className={styles.box_auth}>
      <button onClick={onClose} className={styles.closeModal}>
        <img src={cross} alt='' />
      </button>
      <form
        onSubmit={isLogin ? loginHandler : registrationHandler}
        className={styles.form}>
        <h1 className={styles.title}>
          {isLogin ? "Вход" : "Регистрация"}
        </h1>
        <div className={styles.inputs}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            className={styles.input_auth}
            placeholder='Почта'
            type='text'
          />
          {!isLogin && (
            <input
              onChange={(e) => setTelegram(e.target.value)}
              id='username'
              className={styles.input_auth}
              placeholder='Телеграмм'
              type='text'
            />
          )}
          <input
            className={styles.input_auth}
            id='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Пароль'
          />
          {!isLogin && (
            <input
              className={styles.input_auth}
              placeholder='Повторить пароль'
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {/* <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
            /> */}
            <button
              type='button'
              className={
                isChecked ? styles.checked : styles.buttonCheckbox
              }
              onClick={() => setIsChecked(!isChecked)}></button>
            <p>
              Я даю согласие на{" "}
              <span className={styles.gradientText}>
                обработку своих персональных данных
              </span>{" "}
              {""}и
              <span className={styles.gradientText}>
                {" "}
                принимаю условия оферты
              </span>
            </p>
            {isChecked && (
              <img
                onClick={() => setIsChecked(!isChecked)}
                src={checkedIcon}
                alt='checkedIcon'
                className={styles.checkedIcon}
              />
            )}
          </div>
        )}
        <button className={styles.send_form}>
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <p className={styles.question}>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <button
            type='button'
            onClick={toggleForm}
            className={styles.login_or_reg}>
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </form>
    </div>
  );
};
