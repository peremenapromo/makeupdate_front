import { Inputs } from "components/Inputs/Inputs";
import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import { useDispatch, useSelector } from "app/service/hooks/hooks";
import { getDataUser } from "app/api/api";
import {
  setDescription,
  setIsEditing,
  setIsSaving,
} from "app/service/profileCard/profileCardSlice";
import { toast } from "react-toastify";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import { IGetUserData } from "app/types/type";
import { UpdateProfilePhoto } from "components/Profile/LoadPhoto/LoadPhoto";
import { useLocation } from "react-router";
export const EditProfile = () => {
  const token = localStorage.getItem("accessToken");
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isEditing, isSaving, description } = useSelector(
    (state) => state.profileCard,
  );
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
      await getDataUser(dispatch);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
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
    dispatch(setIsSaving(true));

    const updatedData: Partial<IGetUserData> = {};

    Object.keys(inputData).forEach((key) => {
      const newValue = inputData[key as keyof typeof inputData];
      const oldValue = userData?.[key as keyof IGetUserData];

      if (newValue !== oldValue) {
        if (newValue !== undefined) {
          updatedData[key as keyof IGetUserData] = newValue as never;
        }
      }
    });

    if (description !== userData?.description) {
      updatedData.description = description as string;
    }

    // Проверяем, есть ли изменения, которые нужно сохранить
    if (Object.keys(updatedData).length > 0) {
      const isUpdated = await updateUserData(updatedData);

      if (isUpdated) {
        dispatch(setIsEditing(false));
      }
    } else {
      dispatch(setIsEditing(false));
    }

    // Останавливаем процесс сохранения
    dispatch(setIsSaving(false));
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Редактирование профиля</h1>
      <div className={s.editContainer}>
        <div className={s.imageContainer}>
          <UpdateProfilePhoto
            initialPhotoUrl={userData?.photo ? userData?.photo! : ""}
          />
          <button onClick={toggleEdit} className={s.saveButton}>
            Сохранить
          </button>
        </div>
        <div className={s.inputsContainer}>
          <Inputs
            onInputChange={handleInputChange}
            initialShowTelegram={userData?.show_telegram!}
            initialShowPhone={userData?.show_telephone!}
          />
          <div className={s.info_me}>
            <h3 className={s.title_me}>Обо мне:</h3>
            <div className={s.textareaContainer}>
              <textarea
                name='description'
                className={s.description}
                value={description ?? ""}
                placeholder='Заполнить описание'
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
