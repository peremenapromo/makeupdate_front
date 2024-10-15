import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import mockImage from "../../../app/assets/profileCard/MockImage.png";
import { IProfileMobileProps } from "app/types/type";
import arrow_bottom from "../../../app/assets/profileCard/arrow_bottomProfile.svg";
import arrow_top from "../../../app/assets/profileCard/arrow_topProfile.svg";
import location from "../../../app/assets/profileCard/location.svg";
import videos from "../../../app/assets/profileCard/videos.svg";
import view from "../../../app/assets/profileCard/view.svg";
import { Inputs } from "components/Inputs/Inputs";
import { toast } from "react-toastify";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import { getDataUser } from "app/api/api";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { NavigationProfile } from "../Navigation/Navigation";
import { UpdateProfilePhoto } from "../LoadPhoto/LoadPhoto";
import {
  setDescription,
  setIsEditing,
  setIsSaving,
} from "app/service/profileCard/profileCardSlice";

export const ProfileMobile = ({ photoLink, userData }: any) => {
  const { isEditing, isSaving, description } = useSelector(
    (state) => state.profileCard,
  );
  const [inputData, setInputData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let descriptionInitial: string | undefined =
      userData?.description;
    dispatch(setDescription(descriptionInitial!));
  }, [userData]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

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
  const token = localStorage.getItem("accessToken");
  // console.log(userData);
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
        error.response.data.phone?.[0] ===
        "Это поле не может быть пустым."
      ) {
        toast.error("Поле телефон не может быть пустым");
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
  const toggleEdit = async () => {
    if (isEditing) {
      console.log("true");
      dispatch(setIsSaving(true));
      await updateUserData({
        ...inputData,
        description,
      });
      dispatch(setIsSaving(false));

      if (!isSaving) {
        dispatch(setIsEditing(false));
      }
    } else {
      dispatch(setIsEditing(true));
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.imageProfile}>
        <UpdateProfilePhoto initialPhotoUrl={userData?.photo!} />
      </div>
      <section className={s.name}>
        <h1>
          {userData?.first_name
            ? userData.first_name.toUpperCase()
            : "Имя"}{" "}
          {userData?.last_name
            ? userData.last_name.toUpperCase()
            : "ФАМИЛИЯ"}
        </h1>
      </section>
      <div className={s.infoBlock}>
        <div className={s.box_loc_vid_view}>
          <p className={s.location}>
            <img
              className={s.location_img}
              src={location}
              alt='location_icon'
            />
            <span className={s.locationText}>
              {userData.city && userData.country
                ? `${userData.city},${userData.country}`
                : "Не задано"}
            </span>
          </p>
          <div className={s.videos_view}>
            <p className={s.vid_see}>
              <img
                className={s.vid_see_img}
                src={videos}
                alt='videos_icon'
              />
              0
            </p>
            <p className={s.vid_see}>
              <img
                className={s.vid_see_img}
                src={view}
                alt='view_icon'
              />
              0
            </p>
          </div>
        </div>
      </div>
      <div className={s.buttonsContainer}>
        <button className={`${s.editButton}`} onClick={toggleEdit}>
          <span className={s.editButtonText}>
            {isEditing ? "Сохранить изменения" : "Редактировать"}
          </span>
        </button>

        {isEditing && (
          <Inputs
            onInputChange={handleInputChange}
            initialShowTelegram={userData?.show_telegram}
            initialShowPhone={userData?.show_telephone}
          />
        )}

        <div className={s.buttons}>
          {[
            "Опубликовать урок",
            "Опубликовать событие",
            "Опубликовать фото",
          ].map((button) => (
            <button key={button} className={s.button}>
              <span className={s.btn_text}>{button}</span>
            </button>
          ))}
        </div>
        <div className={s.info_me}>
          <h3 className={s.title_me}>Обо мне:</h3>
          {isEditing ? (
            <div className={s.textareaContainer}>
              <textarea
                name='description'
                className={s.description}
                value={description ?? ""}
                placeholder='Заполнить описание'
                onChange={handleDescriptionChange}
              />
            </div>
          ) : (
            <>
              <p className={open ? s.open : s.text_me}>
                {" "}
                {userData?.description
                  ? userData?.description
                  : "Заполнить описание"}
              </p>
              <div className={s.buttonDescContainer}>
                <button onClick={toggleOpen} className={s.openDesc}>
                  {" "}
                  <img
                    className={s.arrow}
                    src={open ? arrow_top : arrow_bottom}
                    alt='arrow'
                  />
                </button>
              </div>
            </>
          )}
          {!isEditing && (
            <nav className={open ? s.openNavigation : s.navigation}>
              <NavigationProfile />
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
