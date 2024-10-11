import React, { useState } from "react";
import { toast } from "react-toastify";
import { axiosWithRefreshToken } from "helpers/localStorage.helper";
import styles from "./style.module.scss";
import mockImage from "../../../app/assets/profileCard/photo_undefined.svg";
import loadImage from "../../../app/assets/profileCard/loadImage.svg";
import { useSelector } from "app/service/hooks/hooks";

interface UpdatePhotoResponse {
  photo: string;
}

export const UpdateProfilePhoto = ({
  initialPhotoUrl,
}: {
  initialPhotoUrl: string;
}) => {
  const userDataUrl = initialPhotoUrl
    ? "https://api.lr45981.tw1.ru" + initialPhotoUrl
    : null;

  const validPhotoUrl =
    userDataUrl && userDataUrl.includes("null") ? null : userDataUrl;

  const [photoUrl, setPhotoUrl] = useState<string | null>(
    validPhotoUrl || null,
  );
  const [, setPhoto] = useState<File | null>(null);

  const token = localStorage.getItem("accessToken");
  const { isEditing } = useSelector((state) => state.profileCard);
  const updatePhoto = async (selectedPhoto: File) => {
    const formData = new FormData();
    formData.append("photo", selectedPhoto);

    try {
      const response =
        await axiosWithRefreshToken<UpdatePhotoResponse>(
          "https://api.lr45981.tw1.ru/api/v1/profile/my-profile/update-photo/",
          {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            data: formData,
          },
        );

      if (response.photo) {
        toast.success("Фото успешно обновлено!");
        setPhotoUrl("https://api.lr45981.tw1.ru" + response.photo);
      }
    } catch (error) {
      console.error("Ошибка при загрузке фото:", error);
      toast.error("Ошибка при обновлении фото.");
    }
  };

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
      await updatePhoto(selectedPhoto);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type='file'
        accept='image/*'
        style={{ display: "none" }}
        id='photo-upload'
        onChange={handlePhotoChange}
      />
      <button className={styles.loadImage}>
        {isEditing && (
          <>
            <div
              className={styles.hoverBg}
              onClick={() =>
                document.getElementById("photo-upload")?.click()
              }>
              Сменить фото
            </div>
            <img
              src={loadImage}
              alt='loadImage'
              className={styles.loadImageIcon}
              onClick={() =>
                document.getElementById("photo-upload")?.click()
              }
            />
          </>
        )}
        <img
          className={styles.img_me}
          src={photoUrl || mockImage}
          alt='profile_photo or icon'
        />
      </button>
    </div>
  );
};
