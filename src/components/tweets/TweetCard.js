import React from "react";

import { Button, Card, CardBody, Col, Image, Nav, Row } from "react-bootstrap";
import Icon from "../../images/default_icon.jpeg";

//React icon
import { BiMessage } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

//FlashMessageをリセットするための関数
import { useFlashMessage } from "../../hooks/useFlashMessage.js";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUserState } from "../../Atoms/user/LoginUserState.js";
import { deleteTweet } from "../../lib/api/tweet.js";
import { loginUserTweetsState } from "../../Atoms/tweets/loginUserTweetsState.js";

export const TweetCard = ({ tweet }) => {
  const { resetFlashMessage } = useFlashMessage();

  const navigate = useNavigate();

  const handleCardClick = () => {
    resetFlashMessage();
    navigate(`/tweets/${tweet.id}`);
  };

  const [loginUserTweets, setLoginUserTweets] =
    useRecoilState(loginUserTweetsState);

  const deleteLoginUserTweet = async tweetId => {
    if (window.confirm("ツイートを削除しますか？")) {
      try {
        await deleteTweet(tweetId);
        setLoginUserTweets(
          loginUserTweets.filter(tweet => tweet.id !== tweetId)
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  // ログインユーザーのプロフィール画面のみ削除ボタンを表示
  const location = useLocation();
  const loginUser = useRecoilValue(loginUserState);

  const deleteTweetButton = loginUser => {
    const pathname = location.pathname;
    if (pathname !== `/profile/users/${loginUser.id}`) return null;
    return (
      <Button
        className='btn btn-secondary'
        onClick={() => deleteLoginUserTweet(tweet.id)}>
        削除
      </Button>
    );
  };

  return (
    <Card>
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
              <Col className='ms-auto'>{deleteTweetButton(loginUser)}</Col>
            </Row>

            <h4 onClick={handleCardClick}>{tweet.text}</h4>
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
  );
};
