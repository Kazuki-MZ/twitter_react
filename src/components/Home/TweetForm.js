import React, { useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Image, Row } from "react-bootstrap";

import { CgImage } from "react-icons/cg";
import { createTweet } from "../../lib/api/tweet";
import FlashMessage from "../FlashMessage/FlashMessage";
import { createImage } from "../../lib/api/tweetImage";

//デフォルトのユーザーアイコン
import Icon from "../../images/default_icon.jpeg";
import { loginUserState } from "../../Atoms/user/LoginUserState";
import { useRecoilValue } from "recoil";
import { useFlashMessage } from "../../hooks/useFlashMessage";
import { flashMessageState } from "../../Atoms/flashmessage/FlashMessageState";

export const TweetForm = ({ setTotalCount }) => {
  const { createFlashMessage } = useFlashMessage();
  const flashMessage = useRecoilValue(flashMessageState);

  const loginUser = useRecoilValue(loginUserState);

  const [imageId, setImageId] = useState("");
  const [text, setText] = useState("");

  const fileInput = useRef(null);

  const handleImageIconClick = () => {
    fileInput.current.click();
  };

  const uploadImage = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tweet[image]", e.target.files[0]);
    try {
      const res = await createImage(formData);
      setImageId(res.data.id);
    } catch (e) {
      console.log(e);
    }
  };

  const tweetParams = {
    text,
    tweet_image_id: imageId ? imageId : "",
  };

  const handleTweetSubmit = async e => {
    e.preventDefault();
    try {
      await createTweet(tweetParams);
      createFlashMessage(["ツイートしました"], "success", true);
      setTotalCount(prevTotalCount => prevTotalCount + 1);
      setText("");
      setImageId("");
    } catch (e) {
      createFlashMessage([e.response.data.error], "error", true);
    }
  };

  return (
    <Row className='border-bottom'>
      {flashMessage.open && <FlashMessage flashMessage={flashMessage} />}
      <Col
        xs={1}
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Image
          src={
            loginUser?.profile?.iconImageUrl
              ? loginUser.profile.iconImageUrl
              : Icon
          }
          width='80vw'
          height='80vw'
          alt='icon_image'
        />
      </Col>
      <Col xs={11}>
        <Form>
          <FormGroup>
            <Form.Control
              name='text'
              as='textarea'
              value={text}
              style={{ height: "100px", fontSize: "30px" }}
              placeholder='What is happening?!'
              onChange={e => {
                setText(e.target.value);
              }}
            />
            <CgImage
              type='file'
              style={{ fontSize: "25px" }}
              onClick={handleImageIconClick}
            />
            <Form.Control
              hidden
              ref={fileInput}
              type='file'
              onChange={uploadImage}
            />
          </FormGroup>
          <Button
            style={{ marginTop: "10px", marginBottom: "10px" }}
            type='submit'
            variant='primary'
            onClick={handleTweetSubmit}>
            ツイートする
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
