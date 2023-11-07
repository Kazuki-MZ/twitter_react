import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { IconImageForm } from "./IconImageForm";
import { HeaderImageForm } from "./HeaderImage";
import FlashMessage from "./FlashMessage";
import { useSetProfileModal } from "../hooks/useSetProfileModal";
import { FlashMessageContext } from "../context/FlashMessageContext";

export const ProfileUpdateModal = ({ onHide, profileInfo, show }) => {
  const {
    onChangeProfile,
    handleProfileSubmit,
    icon,
    setIcon,
    header,
    setHeader,
    formList,
  } = useSetProfileModal({
    onHide,
    profileInfo,
  });

  //フラッシュメッセージ
  const { flashMessage } = useContext(FlashMessageContext);

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
