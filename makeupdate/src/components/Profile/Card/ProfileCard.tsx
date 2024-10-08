import { FC, useEffect, useState } from "react";
import { Inputs } from "../../Inputs/Inputs";
import styles from "./style.module.scss";
import location from "../../../app/assets/profileCard/location.svg";
import videos from "../../../app/assets/profileCard/videos.svg";
import view from "../../../app/assets/profileCard/view.svg";
import { getDataUser } from "app/api/api";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { toast } from "react-toastify";
import mockImage from "../../../app/assets/profileCard/MockImage.png";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import { UpdateProfilePhoto } from "components/Profile/LoadPhoto/LoadPhoto";

const ProfileCard: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [, setActiveButton] = useState<string | null>(null);
  const [inputData, setInputData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const token = localStorage.getItem("accessToken");

  const { userData } = useSelector((state) => state.user);
  let descriptionInitial: string | undefined = userData?.description;
  const [description, setDescription] = useState<string | null>(
    descriptionInitial!,
  );

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
      await axiosWithRefreshToken(
        "https://api.lr45981.tw1.ru/api/v1/profile/my-profile/update/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: inputData,
        },
      );

      toast.success("Профиль успешно обновлен");
      fetchData();
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

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };
  const toggleEdit = async () => {
    if (isEditing) {
      console.log("true");
      setIsSaving(true);
      await updateUserData({
        ...inputData,
        description,
      });
      setIsSaving(false);

      if (!isSaving) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_img_box}>
        <UpdateProfilePhoto
          initialPhotoUrl={userData?.photo!}
          isEditing={isEditing}
        />
      </div>
      <div className={styles.username_box}>
        <p className={styles.username}>
          <span>
            {userData?.first_name ? userData.first_name : "ИМЯ"}{" "}
          </span>
          <span>
            {userData?.last_name ? userData.last_name : "ФАМИЛИЯ"}
          </span>
        </p>
      </div>

      <div className={styles.containerInfo}>
        <div className={styles.box_loc_vid_view}>
          <p className={styles.location}>
            <img
              className={styles.location_img}
              src={location}
              alt='location_icon'
            />
            <span className={styles.locationText}>
              {userData?.city && userData?.country
                ? `${userData.city}, ${userData.country}`
                : "Не задано"}
            </span>
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
        <button
          className={`${styles.editButton}`}
          onClick={toggleEdit}>
          <span className={styles.editButtonText}>
            {isEditing ? "Сохранить изменения" : "Редактировать"}
          </span>
        </button>

        {isEditing && (
          <Inputs
            onInputChange={handleInputChange}
            initialFirstName={userData?.first_name}
            initialLastName={userData?.last_name}
            initialCity={userData?.city}
            initialCountry={userData?.country}
            initialTelegram={userData?.telegram}
            initialPhone={userData?.phone}
          />
        )}

        <div className={styles.buttons}>
          {[
            "Опубликовать урок",
            "Опубликовать событие",
            "Опубликовать фото",
          ].map((button) => (
            <button
              key={button}
              className={styles.button}
              onClick={() => handleButtonClick(button)}>
              <span className={styles.btn_text}>{button}</span>
            </button>
          ))}
        </div>

        <div className={styles.info_me}>
          <h3 className={styles.title_me}>Обо мне:</h3>
          {isEditing ? (
            <div className={styles.textareaContainer}>
              <textarea
                name='description'
                className={styles.description}
                value={description ?? ""}
                placeholder='Заполнить описание'
                onChange={handleDescriptionChange}
              />
            </div>
          ) : (
            <p className={styles.text_me}>
              {" "}
              {userData?.description
                ? userData?.description
                : "Заполнить описание"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
