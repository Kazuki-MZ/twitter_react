import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailTweet } from "../lib/api/tweet";
import { Col, Row, Image, Nav } from "react-bootstrap";

import Icon from "../images/default_icon.jpeg";

//icon
import { BiMessage } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";

const TweetDetail = () => {
  let { id } = useParams("");
  const [tweet, setTweet] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await getDetailTweet(id);
        setTweet(res.data.tweet);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTweets();
  }, [id]);

  const movementBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <Row className='border-bottom'>
        <Row xs='auto'>
          <Col>
            <FaArrowLeftLong
              style={{ fontSize: "2vw" }}
              onClick={movementBackPage}
            />
          </Col>
          <Col>
            <h3>Post</h3>
          </Col>
        </Row>

        {tweet.user?.profile ? (
          <>
            <Col xs={1}>
              <Image
                src={tweet.user.profile.iconImageUrl || Icon}
                width='90vw'
                height='90vw'
                fluid
                alt='tweet_image'
              />
            </Col>
            <Col xs={11}>
              <h4>{tweet.user.name}</h4>
              <h4>{tweet.text}</h4>
              {tweet.imageUrl ? (
                <Image
                  src={tweet.imageUrl}
                  width='40%'
                  fluid
                  alt='tweet_image'
                />
              ) : (
                <div></div>
              )}
            </Col>
          </>
        ) : (
          <>
            <div>Loading</div>
          </>
        )}

        <Col xs={11}>
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
    </>
  );
};

export default TweetDetail;
