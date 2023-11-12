import { useCallback, useEffect, useState } from "react";
import { updateProfile } from "../lib/api/profile";
import { useFlashMessage } from "./useFlashMessage";

export const useSetProfileModal = ({ profileInfo, onHide }) => {
  const { createFlashMessage } = useFlashMessage();
  const [icon, setIcon] = useState({
    image: "",
    preview: "",
  });

  const [header, setHeader] = useState({
    image: "",
    preview: "",
  });

  const [profile, setProfile] = useState({
    nickname: profileInfo.nickname || "",
    bio: profileInfo.bio || "",
    location: profileInfo.location || "",
    website: profileInfo.website || "",
    dateOfBirth: profileInfo.date_of_birth || "",
  });

  //profileが変わるたびに状態をセットする
  useEffect(() => {
    setProfile({
      nickname: profileInfo.nickname,
      bio: profileInfo.bio,
      location: profileInfo.location,
      website: profileInfo.website,
      dateOfBirth: profileInfo.dateOfBirth,
    });
    setIcon(preveIcon => ({
      ...preveIcon,
      preview: profileInfo.iconImageUrl,
    }));
    setHeader(preveHeader => ({
      ...preveHeader,
      preview: profileInfo.headerImageUrl,
    }));
  }, [profileInfo]);

  const formList = [
    {
      name: "nickname",
      type: "text",
      label: "ニックネーム",
      value: profile.nickname ? profile.nickname : "",
    },
    {
      name: "bio",
      type: "textarea",
      label: "自己紹介",
      value: profile.bio ? profile.bio : "",
    },
    {
      name: "location",
      type: "text",
      label: "場所",
      value: profile.location ? profile.location : "",
    },
    {
      name: "website",
      type: "text",
      label: "Webサイト",
      value: profile.website ? profile.website : "",
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "生年月日",
      value: profile.dateOfBirth ? profile.dateOfBirth : "",
    },
  ];

  const onChangeProfile = useCallback(
    e => {
      const { name, value } = e.target;
      setProfile(prevProfile => ({
        ...prevProfile,
        [name]: value,
      }));
    },
    [setProfile]
  );

  const formData = new FormData();

  // "icon" と "header" 以外のキーに対してのみ、formDataに値を追加
  const setFormDataProfileValue = () => {
    Object.keys(profile).forEach(key => {
      formData.append(`profile[${key}]`, profile[key]);
    });
  };

  //iconとheaderがあればformDataに追加する
  const setProfileImage = () => {
    if (icon.image) {
      formData.append("profile[icon]", icon.image);
    }
    if (header.image) {
      formData.append("profile[header]", header.image);
    }
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();

    setFormDataProfileValue();
    setProfileImage();
    try {
      await updateProfile(formData);
      onHide();
    } catch (e) {
      createFlashMessage(["不正な値です"], "error", true);
    }
  };
  return {
    onChangeProfile,
    handleProfileSubmit,
    icon,
    setIcon,
    header,
    setHeader,
    formList,
  };
};
