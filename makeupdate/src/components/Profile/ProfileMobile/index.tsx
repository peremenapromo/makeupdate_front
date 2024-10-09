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
import { useDispatch } from "app/service/hooks/hooks";
import { NavigationProfile } from "../Navigation/Navigation";
import { UpdateProfilePhoto } from "../LoadPhoto/LoadPhoto";

export const ProfileMobile = ({ photoLink, userData }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputData, setInputData] = useState({
    
  });
  const [isSaving, setIsSaving] = useState(false);
  let descriptionInitial: string | undefined = userData?.description;
  const [description, setDescription] = useState<string | null>(
    descriptionInitial!,
  );
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };
  const handleInputChange = (
    field: string,
    value: string | boolean,
  ) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };
  const token = localStorage.getItem("accessToken");
  // console.log(userData);
  const dispatch = useDispatch();
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
  return (
    <div className={s.wrapper}>
      <div className={s.imageProfile}>
        <UpdateProfilePhoto
          initialPhotoUrl={userData?.photo!}
          isEditing={isEditing}
        />
      </div>
      <section className={s.name}>
        <h1>
          {userData.first_name ?? `Имя `}{" "}
          {userData.last_name ?? "ФАМИЛИЯ"}
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
            initialFirstName={userData?.first_name}
            initialLastName={userData?.last_name}
            initialCity={userData?.city}
            initialCountry={userData?.country}
            initialTelegram={userData?.telegram}
            initialPhone={userData?.phone}
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
