import { useLocation, useParams } from "react-router";
import styles from "./Confirm.module.scss";
import { Link } from "react-router-dom";
import { confirmEmail } from "app/service/servise";
import { useEffect } from "react";

export const Confirm = () => {
  const location = useLocation();

  const { uid, token } = useParams<{ uid: string; token: string }>();

  useEffect(() => {
    const handleConfirmEmail = async () => {
      if (uid && token) {
        try {
          const response = await confirmEmail.confirm({ uid, token });
          console.log(response);
        } catch (error) {
          console.error("Ошибка при подтверждении:", error);
        }
      }
    };

    handleConfirmEmail();
  }, [uid, token]);
  return (
    <div className={styles.box_email}>
      <h1>MAKEUPDATE</h1>
      <h3>Вы успешно подтвердили почту!</h3>
      <Link to='/'>
        <button onClick={() => (location.pathname = "/home")}>
          Вернуться на главную страницу
        </button>
      </Link>
    </div>
  );
};
