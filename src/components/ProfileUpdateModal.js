import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateProfile } from "../lib/api/profile";
import { IconImageForm } from "./IconImageForm";
import { HeaderImageForm } from "./HeaderImage";
import FlashMessage from "./FlashMessage";

export const ProfileUpdateModal = ({
  onHide,
  profileInfo,
  show,
  flashMessage,
  createFlashMessage,
}) => {
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

  const onChangeProfile = e => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

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

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Form>
        {flashMessage.open && <FlashMessage flashMessage={flashMessage} />}
        {formList.map(item => (
          <Form.Group key={item.name} className='mb-3'>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control
              value={item.value}
              name={item.name}
              type={item.type}
              onChange={onChangeProfile}
            />
          </Form.Group>
        ))}
        <HeaderImageForm header={header} setHeader={setHeader} />
        <IconImageForm icon={icon} setIcon={setIcon} />
      </Form>

      <Modal.Footer>
        <Button variant='primary' onClick={handleProfileSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
