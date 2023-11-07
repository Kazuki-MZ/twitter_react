import React, { useContext } from "react";

import { Card, CardBody, Col, Image, Nav, Row } from "react-bootstrap";
import Icon from "../images/default_icon.jpeg";

//React icon
import { BiMessage } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import moment from "moment";
import { useNavigate } from "react-router-dom";

//FlashMessageをリセットするための関数
import { FlashMessageContext } from "../context/FlashMessageContext";

export const TweetCard = ({ tweet }) => {
  const { resetFlashMessage } = useContext(FlashMessageContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    resetFlashMessage();
    navigate(`/tweets/${tweet.id}`);
  };

  return (
    <Card onClick={handleCardClick}>
      <CardBody>
        <Row>
          <Col xs={1}>
            <Image
              src={tweet.user.profile?.iconImageUrl || Icon}
              width='70vw'
              height='70vw'
              alt='tweet_image'
            />
          </Col>
          <Col xs={11}>
            <Row xs='auto'>
              <Col>
                <h4>{tweet.user.name}</h4>
              </Col>
              <Col>
                <p className='text-muted'>
                  {moment(tweet.createdAt).format("YYYY-MM-DD")}
                </p>
              </Col>
            </Row>

            <h4>{tweet.text}</h4>
            {tweet.imageUrl ? (
              <Image src={tweet.imageUrl} width='40%' fluid alt='tweet_image' />
            ) : (
              <div></div>
            )}

            <Nav
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.6vw",
              }}>
              <Nav.Item>
                <Nav.Link>
                  <BiMessage color='black' />
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link>
                  <FaRetweet color='black' />
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link>
                  <AiOutlineHeart color='black' />
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link>
                  <BsBookmark color='black' />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </CardBody>
    </Card>
    // </Link>
  );
};
