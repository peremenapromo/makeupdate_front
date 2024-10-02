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
      if (uid && token) {
        try {
          const response = await confirmEmail.confirm({ uid, token });
          if (response?.status !== 204) {
            throw new Error("Invalid response status");
          }
          console.log("Email подтверждён!");
          setText("Вы успешно подтвердили почту!");
        } catch (error) {
          toast.error(
            "Ссылка подтверждения устарела,проверьте,пожалуйста почту.",
          );
          setText("Ошибка при подтверждении почты, ссылка устарела.");

          try {
            await confirmEmail.resend();
            toast.success(
              "Повторное письмо подтверждения успешно отправлено",
            );
          } catch (resendError) {
            toast.error("Ошибка при повторной отправке активации");
          }
        }
      }
    };

    handleConfirmEmail();
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
