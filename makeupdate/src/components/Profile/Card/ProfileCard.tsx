import { useEffect, useState } from "react";
import { Inputs } from "../../Inputs/Inputs";
import styles from "./style.module.scss";
import location from "../../../app/assets/profileCard/location.svg";
import videos from "../../../app/assets/profileCard/videos.svg";
import view from "../../../app/assets/profileCard/view.svg";
import {
  getCounterProfile,
  getDataUser,
  getDataUserProfileForLessons,
} from "app/api/api";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { toast } from "react-toastify";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import { UpdateProfilePhoto } from "components/Profile/LoadPhoto/LoadPhoto";
import { IGetUserData } from "app/types/type";
import {
  setDescription,
  setIsEditing,
  setIsSaving,
  setActiveButton,
} from "app/service/profileCard/profileCardSlice";

interface ProfileCardProps {
  idLink: string;
}

const ProfileCard = ({ idLink }: ProfileCardProps) => {
  const { isEditing, description, counter } = useSelector(
    (state) => state.profileCard,
  );

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "",
    city: "",
    country: "",
    telegram: "",
    phone: "",
    show_telegram: true,
    show_telephone: true,
  });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (userData) {
      setInputData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        city: userData.city || "",
        country: userData.country || "",
        telegram: userData.telegram || "",
        phone: userData.phone || "",
        show_telegram: userData.show_telegram ?? true,
        show_telephone: userData.show_telephone ?? true,
      });
      let descriptionInitial: string | undefined =
        userData?.description;
      dispatch(setDescription(descriptionInitial));
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      // await getDataUser(dispatch);
      await getCounterProfile(
        dispatch,
        userData?.user_id.toString()!,
      );
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const savedButton = localStorage.getItem("activeButton");
    if (savedButton) {
      dispatch(setActiveButton(savedButton));
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
      return true;
    } catch (error: any) {
      console.log(error.response.data.telegram?.[0]);
      if (error.response.data?.[0] === "first_name already exists") {
        toast.error("Имя / Фамилию нельзя изменить!");
      } else if (
        error.response.data?.[0] === "last_name already exists"
      ) {
        toast.error("Фамилию нельзя изменить!");
      } else if (
        error.response.data.phone?.[0] ===
        "Phone number must be format: '+999999999'. Allow from 7 to 15 digits."
      ) {
        toast.error(
          "Телефон должен иметь формат: +999999999.От 7 до 15 символов.",
        );
      } else if (
        error.response.data.telegram?.[0] ===
        "Это поле не может быть пустым."
      ) {
        toast.error("Поле телеграм не должно быть пустым");
      } else {
        toast.error("Произошла ошибка при обновлении профиля.");
      }
      return false;
    }
  };

  // const handleButtonClick = (buttonName: string) => {
  //   dispatch(setActiveButton(buttonName));
  //   localStorage.setItem("activeButton", buttonName);
  // };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    dispatch(setDescription(e.target.value));
  };

  const handleInputChange = (
    field: string,
    value: string | boolean,
  ) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };
  const toggleEdit = async () => {
    if (isEditing) {
      dispatch(setIsSaving(true));
      const updatedData: Partial<IGetUserData> = {};
      Object.keys(inputData).forEach((key) => {
        const newValue = inputData[key as keyof typeof inputData];
        const oldValue = userData?.[key as keyof IGetUserData];

        if (newValue !== oldValue) {
          if (newValue !== undefined) {
            updatedData[key as keyof IGetUserData] =
              newValue as never;
          }
        }
      });

      if (description !== userData?.description) {
        updatedData.description = description as string;
      }

      if (Object.keys(updatedData).length > 0) {
        const isUpdated = await updateUserData(updatedData);

        if (isUpdated) {
          dispatch(setIsEditing(false));
        }
      } else {
        dispatch(setIsEditing(false));
      }
      dispatch(setIsSaving(false));
    } else {
      dispatch(setIsEditing(true));
    }
  };

  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_img_box}>
        <UpdateProfilePhoto
          initialPhotoUrl={userData?.photo ? userData?.photo! : ""}
        />
      </div>
      <div className={styles.username_box}>
        {userData && (
          <div className={styles.username}>
            <div className={styles.usernameLang}>
              <span>
                {userData?.first_name
                  ? userData?.first_name.toUpperCase()
                  : "ИМЯ"}{" "}
              </span>{" "}
              <span>
                {userData?.last_name
                  ? userData?.last_name.toUpperCase()
                  : "ФАМИЛИЯ"}
              </span>
            </div>
            <div className={styles.usernameLang}>
              <span>
                {userData?.lat_first_name
                  ? userData?.lat_first_name.toUpperCase()
                  : ""}{" "}
              </span>{" "}
              <span>
                {userData?.lat_last_name
                  ? userData?.lat_last_name.toUpperCase()
                  : ""}
              </span>
            </div>
          </div>
        )}
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
                src={view}
                alt='view_icon'
              />
              {counter ? counter[0].total_views : "0"}
            </p>
            <p className={styles.vid_see}>
              <img
                className={styles.vid_see_img}
                src={videos}
                alt='videos_icon'
              />
              {counter ? counter[0].count_lessons : "0"}
            </p>
          </div>
        </div>
        {window.location.pathname === "/profile" ||
        userData?.user_id === +idLink ? (
          <button
            className={`${styles.editButton}`}
            onClick={toggleEdit}>
            <span className={styles.editButtonText}>
              {isEditing ? "Сохранить изменения" : "Редактировать"}
            </span>
          </button>
        ) : (
          <div>123</div>
        )}

        {isEditing && (
          <Inputs
            onInputChange={handleInputChange}
            initialShowTelegram={userData?.show_telegram!}
            initialShowPhone={userData?.show_telephone!}
          />
        )}

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
