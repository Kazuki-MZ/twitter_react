import React, { useRef } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useUploadFile } from "../hooks/useUploadFile";

export const IconImageForm = ({ icon, setIcon }) => {
  const fileInputRef = useRef();

  const { file, checkFileExists, onClickNullFile } = useUploadFile({
    file: icon,
    setFile: setIcon,
  });

  return (
    <Form.Group key='icon' className='mb-3'>
      <Form.Label>アイコン</Form.Label>
      <Form.Control
        type='file'
        style={{ display: "none" }}
        ref={fileInputRef}
        accept='images/*'
        onChange={checkFileExists}
      />
      {file.preview ? (
        <Image
          src={icon.preview}
          width='70vw'
          height='70vw'
          alt='アイコン画像プレビュー'
          onClick={onClickNullFile}
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
