import { useLocation, useParams } from "react-router";
import styles from "./Confirm.module.scss";
import { Link } from "react-router-dom";
import { confirmEmail } from "app/service/servise";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Confirm = () => {
  const location = useLocation();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const handleConfirmEmail = async () => {
      const email = localStorage.getItem("email");

      if (email && uid && token) {
        try {
          const response = await confirmEmail.confirm({
            uid,
            token,
          });
          console.log(response);
          if (response?.status === 204) {
            localStorage.removeItem("email");
            setText("Почта успешно подтверждена!");
            toast.success("Почта успешно подтверждена!");
            setTimeout(() => {
              window.location.pathname = "/";
            }, 5000);
          } else {
            console.log(response);
            await confirmEmail.resend();
            toast.success(
              "Повторное письмо подтверждения успешно отправлено.",
            );
          }
        } catch (error) {
          toast.error(
            "Ссылка подтверждения устарела, проверьте почту.",
          );
          setText("Ошибка при подтверждении почты, ссылка устарела.");

          try {
            await confirmEmail.resend();
            toast.success(
              "Повторное письмо подтверждения успешно отправлено.",
            );
          } catch (resendError) {
            toast.error("Ошибка при повторной отправке активации.");
          }
        }
      } else {
        toast.error(
          "Email не найден. Пожалуйста, повторите подтверждение.",
        );
      }
    };

    const timer = setTimeout(() => {
      handleConfirmEmail();
    }, 2000);
    return () => clearTimeout(timer);
  }, [uid, token]);

  return (
    <div className={styles.box_email}>
      <h1>MAKEUPDATE</h1>
      <h3>{text}</h3>
      <Link to='/'>
        <button onClick={() => (location.pathname = "/home")}>
          Вернуться на главную страницу
        </button>
      </Link>
    </div>
  );
};
