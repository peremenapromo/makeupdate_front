import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import closeIcon from "../../app/assets/confirmEmailModal/closeModalIcon.svg";
import { confirmEmail } from "app/service/servise";
import { toast } from "react-toastify";
export const ConfirmEmailModal = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const resend = async () => {
    try {
      await confirmEmail.resend();
      toast.success(
        "Повторное письмо подтверждения успешно отправлено.",
      );
      setSeconds(30);
    } catch (resendError) {
      toast.error("Ошибка при повторной отправке активации.");
    }
  };
  const close = () => {
    closeModal();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.closeIcon} onClick={close}>
        <img src={closeIcon} alt='closeIcon' />
      </div>
      <div className={s.container}>
        <h1 className={s.title}>РЕГИСТРАЦИЯ</h1>
        <h2 className={s.subtitle}>Письмо отправлено на почту</h2>
        {seconds > -1 && (
          <span className={s.timer}>
            Отправить письмо повторно можно через: {seconds} секунд
          </span>
        )}
        <button
          className={seconds === 0 ? s.active : s.wait}
          onClick={resend}>
          Отправить письмо повторно
        </button>
      </div>
    </div>
  );
};
