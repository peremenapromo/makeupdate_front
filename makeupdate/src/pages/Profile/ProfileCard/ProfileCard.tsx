import { FC, useEffect, useState } from "react";
import { Inputs } from "../../../components/Inputs/Inputs";
import styles from "../Profile.module.scss";
import location from "../../../app/assets/profileCard/location.svg";
import undefinedImage from "../../../app/assets/profileCard/unknown_user.svg";
import videos from "../../../app/assets/profileCard/videos.svg";
import view from "../../../app/assets/profileCard/view.svg";
import { getDataUser } from "app/api/api";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import axios from "axios";
import { features } from "process";
import { toast } from "react-toastify";

const ProfileCard: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(
    null,
  );
  const [inputData, setInputData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // console.log(inputData);

  const token = localStorage.getItem("accessToken");

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await getDataUser(dispatch);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const savedButton = localStorage.getItem("activeButton");
    if (savedButton) {
      setActiveButton(savedButton);
    }
  }, [dispatch]);
  const updateUserData = async (inputData: any) => {
    const fetchData = async () => {
      await getDataUser(dispatch);
    };
    try {
      const response = await axios.put(
        "https://api.lr45981.tw1.ru/api/v1/profile/",
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Профиль успешно обновлен");
        fetchData();
      }

      return response.status === 200;
    } catch (error: any) {
      console.error("Ошибка при сохранении данных:", error);

      if (error.response.data[0] === "first_name already exists") {
        toast.error("Имя / Фамилию нельзя изменить!");
      } else if (
        error.response.data[0] === "last_name already exists"
      ) {
        toast.error("Фамилию нельзя изменить!");
      }
      return false;
    }
  };
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    localStorage.setItem("activeButton", buttonName);
  };

  const toggleEdit = async () => {
    if (isEditing) {
      setIsSaving(true);
      const isSaved = await updateUserData(inputData);
      setIsSaving(false); // Заканчиваем сохранение

      if (isSaved) {
        setIsEditing(false); // Если сохранение успешно, выходим из режима редактирования
      } else {
        setError("Ошибка при сохранении данных"); // В случае ошибки выводим сообщение
      }
    } else {
      setIsEditing(true); // Включаем режим редактирования
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_img_box}>
        <img
          className={styles.img_me}
          src={undefinedImage}
          alt='profile_photo or icon'
        />
      </div>
      <div className={styles.box_name_mobile}>
        <p className={styles.username_mobile}>ЛЕНА МОТИНОВА</p>
      </div>
      <div className={styles.box_loc_vid_view}>
        <p className={styles.location}>
          <img
            className={styles.location_img}
            src={location}
            alt='location_icon'
          />
          {userData?.city && userData?.country
            ? `${userData.city},${userData.country}`
            : "Не задано"}
        </p>
        <div className={styles.videos_view}>
          <p className={styles.vid_see}>
            <img
              className={styles.vid_see_img}
              src={videos}
              alt='videos_icon'
            />
            0
          </p>
          <p className={styles.vid_see}>
            <img
              className={styles.vid_see_img}
              src={view}
              alt='view_icon'
            />
            0
          </p>
        </div>
      </div>

      {/* Условия для отображения инпутов */}
      {isEditing && (
        <Inputs
          onInputChange={handleInputChange}
          initialFirstName={userData?.first_name}
          initialLastName={userData?.last_name}
          initialCity={userData?.city}
          initialTelegram={userData?.user.telegram}
          initialPhone={userData?.phone}
        />
      )}

      <div className={styles.buttons}>
        <button className={`${styles.button}`} onClick={toggleEdit}>
          <span className={`${styles.btn_text}`}>
            {isEditing ? "Сохранить" : "Редактировать"}
          </span>
        </button>
        {[
          "Опубликовать урок",
          "Опубликовать событие",
          "Опубликовать фото",
        ].map((button) => (
          <button
            key={button}
            className={`${styles.button} ${
              activeButton === button ? styles.active_button : ""
            }`}
            onClick={() => handleButtonClick(button)}>
            <span
              className={`${styles.btn_text} ${
                activeButton === button ? styles.btn_text_active : ""
              }`}>
              {button}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.info_me}>
        <h3 className={styles.title_me}>Обо мне:</h3>
        <p className={styles.text_me}>Заполнить описание</p>
      </div>
    </div>
  );
};

export default ProfileCard;
