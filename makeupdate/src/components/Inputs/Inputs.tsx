import { useState } from "react";
import styles from "./Inputs.module.scss";
import showIcon from "../../app/assets/profileCard/ShowIcon.svg";
import hideIcon from "../../app/assets/profileCard/NotShowIcon.svg";
import { InputFieldProps, InputsProps } from "app/types/type";
import { toast } from "react-toastify";
import { useSelector } from "app/service/hooks/hooks";

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  error,
  label,
  required = false,
  readOnly = false,
  isPassword = false,
  isVisible = true,
  onVisibilityToggle,
}) => {
  return (
    <div className={styles.group}>
      <input
        value={value ?? ""}
        onChange={onChange}
        className={readOnly ? styles.inputRead : styles.input}
        type={isPassword && !isVisible ? "password" : "text"}
        required={required}
        readOnly={readOnly}
      />
      {isPassword && (
        <img
          src={isVisible ? hideIcon : showIcon}
          alt='icon'
          className={styles.showIcon}
          onClick={onVisibilityToggle}
        />
      )}
      <span className={styles.highlight}></span>
      <label className={readOnly ? styles.labelRead : styles.label}>
        {value === "" || value === null ? `Введите ${label}` : label}
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
  initialShowPhone = true,
  initialShowTelegram = true,
}) => {
  const { userData } = useSelector((state) => state.user);
  const name = userData?.first_name;
  const lastName = userData?.last_name;
  const [inputValues, setInputValues] = useState({
    first_name: initialFirstName,
    last_name: initialLastName,
    city: initialCity,
    country: initialCountry,
    telegram: initialTelegram,
    phone: initialPhone,
  });

  const [showTelegram, setShowTelegram] = useState<boolean>(
    initialShowTelegram,
  );
  const [showPhone, setShowPhone] =
    useState<boolean>(initialShowPhone);

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    city: "",
    phone: "",
  });

  const handleChange = (field: string, value: string | boolean) => {
    onInputChange(field, value);

    if (typeof value === "boolean") {
      if (field === "show_telegram") {
        setShowTelegram(value);
      } else if (field === "show_telephone") {
        setShowPhone(value);
      }
    } else {
      setInputValues((prev) => ({ ...prev, [field]: value }));

      setErrors((prev) => ({
        ...prev,
        [field]:
          value.trim() === "" ? "Поле не должно быть пустым!" : "",
      }));
    }
  };

  return (
    <div className={styles.inputs_box}>
      {/* Имя */}
      <InputField
        value={inputValues.first_name}
        onChange={(e) => handleChange("first_name", e.target.value)}
        error={errors.first_name}
        label='Имя'
        required
        readOnly={name !== null}
      />

      {/* Фамилия */}
      <InputField
        value={inputValues.last_name}
        onChange={(e) => handleChange("last_name", e.target.value)}
        error={errors.last_name}
        label='Фамилия'
        required
        readOnly={lastName !== null}
      />

      {/* Телеграм */}
      <InputField
        value={inputValues.telegram}
        onChange={(e) => handleChange("telegram", e.target.value)}
        label='Telegram'
        isPassword
        isVisible={showTelegram}
        onVisibilityToggle={() => {
          const newValue = !showTelegram;
          setShowTelegram(newValue);
          handleChange("show_telegram", newValue);
        }}
      />

      {/* Телефон */}
      <InputField
        value={inputValues.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        label='Номер'
        isPassword
        isVisible={showPhone}
        onVisibilityToggle={() => {
          const newValue = !showPhone;
          setShowPhone(newValue);
          handleChange("show_telephone", newValue);
        }}
      />

      {/* Город */}
      <InputField
        value={inputValues.city}
        onChange={(e) => handleChange("city", e.target.value)}
        error={errors.city}
        label='Город'
        required
      />

      {/* Страна */}
      <InputField
        value={inputValues.country}
        onChange={(e) => handleChange("country", e.target.value)}
        label='Страна'
        required
      />
    </div>
  );
};
