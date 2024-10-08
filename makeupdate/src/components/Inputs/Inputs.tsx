import { useState } from "react";
import styles from "./Inputs.module.scss";
import showIcon from "../../app/assets/profileCard/ShowIcon.svg";
import hideIcon from "../../app/assets/profileCard/NotShowIcon.svg";
import { InputFieldProps, InputsProps } from "app/types/type";

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  error,
  label,
  required = false,
  readOnly = false,
  icon,
  isPassword = false,
}) => {
  const [isTextVisible, setIsTextVisible] = useState(true);

  const toggleVisibility = () => {
    setIsTextVisible((prev) => !prev);
  };

  return (
    <div className={styles.group}>
      <input
        value={value}
        onChange={onChange}
        className={readOnly ? styles.inputRead : styles.input}
        type={isPassword && !isTextVisible ? "password" : "text"}
        required={required}
        readOnly={readOnly}
      />
      {isPassword && (
        <img
          src={isTextVisible ? hideIcon : showIcon}
          alt='icon'
          className={styles.showIcon}
          onClick={toggleVisibility}
        />
      )}
      <span className={styles.highlight}></span>
      <label className={readOnly ? styles.labelRead : styles.label}>
        {value.length === 0 ? `Введите ${label}` : label}
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export const Inputs: React.FC<InputsProps> = ({
  onInputChange,
  initialFirstName = "",
  initialLastName = "",
  initialCity = "",
  initialCountry = "",
  initialTelegram = "",
  initialPhone = "",
}) => {
  const [inputValue, setInputValue] =
    useState<string>(initialFirstName);
  const [secondValue, setSecondValue] =
    useState<string>(initialLastName);
  const [countryValue, setCountryValue] =
    useState<string>(initialCountry);
  const [cityValue, setCityValue] = useState<string>(initialCity);
  const [telegramValue, setTelegramValue] =
    useState<string>(initialTelegram);
  const [phoneValue, setPhoneValue] = useState<string>(initialPhone);

  const [error, setError] = useState<string>("");
  const [errorSecondName, setErrorSecondName] = useState<string>("");
  const [errorLocation, setErrorLocation] = useState<string>("");

  const handleChange = (field: string, value: string) => {
    onInputChange(field, value);
    if (value.trim() === "") {
      if (field === "first_name")
        setError("Поле не должно быть пустым!");
      if (field === "last_name")
        setErrorSecondName("Поле не должно быть пустым!");
      if (field === "city")
        setErrorLocation("Поле не должно быть пустым!");
    } else {
      setError("");
      setErrorSecondName("");
      setErrorLocation("");
    }
  };

  return (
    <div className={styles.inputs_box}>
      {/* Имя */}
      <InputField
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleChange("first_name", e.target.value);
        }}
        error={error}
        label='Имя'
        required
        readOnly={inputValue !== null}
      />

      {/* Фамилия */}
      <InputField
        value={secondValue}
        onChange={(e) => {
          setSecondValue(e.target.value);
          handleChange("last_name", e.target.value);
        }}
        error={errorSecondName}
        label='Фамилия'
        required
        readOnly={secondValue !== null}
      />

      <InputField
        value={telegramValue}
        onChange={(e) => {
          setTelegramValue(e.target.value);
          handleChange("telegram", e.target.value);
        }}
        label='Telegram'
        icon={showIcon}
        isPassword
      />

      {/* Телефон */}
      <InputField
        value={phoneValue}
        onChange={(e) => {
          setPhoneValue(e.target.value);
          handleChange("phone", e.target.value);
        }}
        label='Номер'
        icon={showIcon}
        isPassword
      />

      {/* Город */}
      <InputField
        value={cityValue}
        onChange={(e) => {
          setCityValue(e.target.value);
          handleChange("city", e.target.value);
        }}
        error={errorLocation}
        label='Город'
        required
      />

      {/* Страна */}
      <InputField
        value={countryValue}
        onChange={(e) => {
          setCountryValue(e.target.value);
          handleChange("country", e.target.value);
        }}
        label='Страна'
        required
      />
    </div>
  );
};
