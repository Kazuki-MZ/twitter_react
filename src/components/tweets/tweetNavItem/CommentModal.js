import React from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";

import { useRecoilValue } from "recoil";
import moment from "moment";

import Icon from "../../../images/default_icon.jpeg";

import { loginUserState } from "../../../Atoms/user/LoginUserState";
import { createComment } from "../../../lib/api/comment";

export const CommentModal = ({
  show,
  onHide,
  tweetInfo,
  comment,
  setComment,
}) => {
  const loginUser = useRecoilValue(loginUserState);

  const onChangeComment = e => {
    setComment(e.target.value);
  };

  const commentParams = {
    context: comment,
    tweetId: tweetInfo.id,
  };

  const handleCommentSubmit = async e => {
    e.preventDefault();
    try {
      await createComment(commentParams);
      onHide();
    } catch (e) {
      console.log("e", e);
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
          Post your reply
        </Modal.Title>
      </Modal.Header>
      <Row>
        <Col xs={2}>
          <Image
            src={tweetInfo.user.profile?.iconImageUrl || Icon}
            width='70vw'
            height='70vw'
            alt='user_icon'
            className='rounded-circle'
          />
        </Col>

        <Col xs={10}>
          <Row xs='auto'>
            <Col>
              <h4 className='fw-bold'>{tweetInfo.user.name}</h4>
            </Col>
            <Col>
              <h5 className='text-muted'>
                {moment(tweetInfo.createdAt).format("YYYY-MM-DD")}
              </h5>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <h4>{tweetInfo.text}</h4>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className='mt-5'>
        <Col xs={2}>
          <Image
            src={loginUser.profile?.iconImageUrl || Icon}
            width='70vw'
            height='70vw'
            alt='user_icon'
            className='rounded-circle'
          />
        </Col>
        <Col xs={10}>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control
                value={comment}
                as='textarea'
                rows={3}
                placeholder='Post your reply'
                onChange={onChangeComment}
                className='fs-3'
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Modal.Footer>
        <Button variant='primary' onClick={handleCommentSubmit}>
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
