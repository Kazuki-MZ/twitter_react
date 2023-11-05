import React, { useEffect, useRef } from "react";
import { Button, Form, Image } from "react-bootstrap";

export const HeaderImageForm = ({ header, setHeader }) => {
  const fileInputRef = useRef();

  useEffect(() => {
    if (header.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeader(preveHeader => ({
          ...preveHeader,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(header.image);
    } else {
      setHeader(preveHeader => ({
        ...preveHeader,
        preview: null,
      }));
    }
  }, [header.image]);

  return (
    <Form.Group key='icon' className='mb-3'>
      <Form.Label>ヘッダー</Form.Label>
      <Form.Control
        type='file'
        style={{ display: "none" }}
        ref={fileInputRef}
        accept='images/*'
        onChange={e => {
          const file = e.target.files[0];
          if (file) {
            setHeader(preveHeader => ({
              ...preveHeader,
              image: file,
            }));
          } else {
            setHeader(preveHeader => ({
              ...preveHeader,
              image: null,
            }));
          }
        }}
      />
      {header.preview ? (
        <Image
          src={header.preview}
          width='130vw'
          height='70vw'
          alt='画像プレビュー'
          onClick={() =>
            setHeader(preveHeader => ({
              ...preveHeader,
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
          Edit Header
        </Button>
      )}
    </Form.Group>
  );
};
