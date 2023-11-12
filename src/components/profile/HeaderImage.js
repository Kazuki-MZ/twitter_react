import React, { useRef } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useUploadFile } from "../../hooks/useUploadFile";

export const HeaderImageForm = ({ header, setHeader }) => {
  const fileInputRef = useRef();

  const { file, checkFileExists, onClickNullFile } = useUploadFile({
    file: header,
    setFile: setHeader,
  });

  return (
    <Form.Group key='header' className='mb-3'>
      <Form.Label>ヘッダー</Form.Label>
      <Form.Control
        type='file'
        style={{ display: "none" }}
        ref={fileInputRef}
        accept='images/*'
        onChange={checkFileExists}
      />
      {file.preview ? (
        <Image
          src={header.preview}
          width='130vw'
          height='70vw'
          alt='ヘッダー画像プレビュー'
          onClick={onClickNullFile}
        />
      ) : (
        <Button
          variant='secondary'
          onClick={e => {
            e.preventDefault();
            fileInputRef.current.click();
          }}>
          Edit Header
        </Button>
      )}
    </Form.Group>
  );
};
