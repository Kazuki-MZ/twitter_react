import React, { useEffect, useRef } from "react";
import { Button, Form, Image } from "react-bootstrap";

export const IconImageForm = ({ icon, setIcon }) => {
  const fileInputRef = useRef();

  useEffect(() => {
    if (icon.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(preveIcon => ({
          ...preveIcon,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(icon.image);
    } else {
      setIcon(preveIcon => ({
        ...preveIcon,
        preview: "",
      }));
    }
  }, [icon.image]);

  return (
    <Form.Group key='icon' className='mb-3'>
      <Form.Label>アイコン</Form.Label>
      <Form.Control
        type='file'
        style={{ display: "none" }}
        ref={fileInputRef}
        accept='images/*'
        onChange={e => {
          const file = e.target.files[0];
          if (file) {
            setIcon(preveIcon => ({
              ...preveIcon,
              image: file,
            }));
          } else {
            setIcon(preveIcon => ({
              ...preveIcon,
              image: "",
            }));
          }
        }}
      />
      {icon.preview ? (
        <Image
          src={icon.preview}
          width='70vw'
          height='70vw'
          alt='画像プレビュー'
          onClick={() =>
            setIcon(preveIcon => ({
              ...preveIcon,
              image: null,
            }))
          }
        />
      ) : (
        <Button
          variant='secondary'
          onClick={e => {
            e.preventDefault();
            fileInputRef.current.click();
          }}>
          Edit Icon
        </Button>
      )}
    </Form.Group>
  );
};
