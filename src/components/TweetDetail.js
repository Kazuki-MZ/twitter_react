import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailTweet } from "../lib/api/tweet";
import { Col, Row, Image, Nav } from "react-bootstrap";

//icon
import { BiMessage } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";

const TweetDetail = () => {
  let { id } = useParams("");
  const [tweet, setTweet] = useState({});
  const arrowClick = useRef();

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

  const movementHomePage = () => {
    arrowClick.current.click();
  };

  return (
    <>
      <Row className='border-bottom'>
        <Row xs='auto'>
          <Col>
            <FaArrowLeftLong
              style={{ fontSize: "2vw" }}
              onClick={movementHomePage}
            />
            <Link hidden ref={arrowClick} to='/'></Link>
          </Col>
          <Col>
            <h3>Post</h3>
          </Col>
        </Row>

        <Col xs={1}>アイコン</Col>
        <Col xs={11}>
          {tweet.user ? (
            <>
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
            </>
          ) : (
            <h4>Loading</h4>
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
    </>
  );
};

export default TweetDetail;
