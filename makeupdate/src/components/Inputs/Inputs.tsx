import { useState } from "react";
import styles from "./Inputs.module.scss";

interface InputsProps {
  onInputChange: (field: string, value: string) => void;
  initialFirstName?: string;
  initialLastName?: string;
  initialCity?: string;
  initialTelegram?: string;
  initialPhone?: string;
}

export const Inputs: React.FC<InputsProps> = ({
	onInputChange,
	initialFirstName = "",
	initialLastName = "",
	initialCity = "",
	initialTelegram = "",
	initialPhone = "",
  }) => {
	const [inputValue, setInputValue] = useState<string>(initialFirstName);
	const [secondValue, setSecondValue] = useState<string>(initialLastName);
	const [locationValue, setLocationValue] = useState<string>(initialCity);
	const [telegramValue, setTelegramValue] = useState<string>(initialTelegram);
	const [phoneValue, setPhoneValue] = useState<string>(initialPhone);
  
	const [error, setError] = useState<string>("");
	const [errorSecondName, setErrorSecondName] = useState<string>("");
	const [errorLocation, setErrorLocation] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange("first_name", value); // Передача значения родителю

    if (value.trim() === "") {
      setError("Поле не должно быть пустым!");
    } else {
      setError("");
    }
  };

  const inputSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSecondValue(value);
    onInputChange("last_name", value); // Передача значения родителю

    if (value.trim() === "") {
      setErrorSecondName("Поле не должно быть пустым!");
    } else {
      setErrorSecondName("");
    }
  };

  const inputLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocationValue(value);
    onInputChange("city", value); // Передача значения родителю

    if (value.trim() === "") {
      setErrorLocation("Поле не должно быть пустым!");
    } else {
      setErrorLocation("");
    }
  };

  const handleTelegramChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setTelegramValue(value);
    onInputChange("telegram", value); // Передача значения родителю
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setPhoneValue(value);
    onInputChange("phone", value); // Передача значения родителю
  };

  return (
    <div className={styles.inputs_box}>
      <div className={styles.group}>
        <input
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
          type='text'
          required
        />
        <span className={styles.highlight}></span>
        <label>Введите Имя*</label>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.group}>
        <input
          value={secondValue}
          onChange={inputSecond}
          className={styles.input}
          type='text'
          required
        />
        <span className={styles.highlight}></span>
        <label>Введите Фамилию*</label>
        {errorSecondName && (
          <p className={styles.error}>{errorSecondName}</p>
        )}
      </div>
      <div className={styles.group}>
        <input
          value={telegramValue}
          onChange={handleTelegramChange}
          className={styles.input}
          type='text'
          required
        />
        <span className={styles.highlight}></span>
        <label>Введите Telegram</label>
      </div>
      <div className={styles.group}>
        <input
          value={phoneValue}
          onChange={handlePhoneChange}
          className={styles.input}
          type='text'
          required
        />
        <span className={styles.highlight}></span>
        <label>Введите номер</label>
      </div>
      <div className={styles.group}>
        <input
          value={locationValue}
          onChange={inputLocation}
          className={styles.input}
          type='text'
          required
        />
        <span className={styles.highlight}></span>
        <label>Введите местоположение*</label>
        {errorLocation && (
          <p className={styles.error}>{errorLocation}</p>
        )}
      </div>
    </div>
  );
};
