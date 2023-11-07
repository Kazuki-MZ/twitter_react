import React, { createContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TweetForm } from "./TweetForm";
import { TweetList } from "./TweetList";
import { getAllTweets } from "../lib/api/tweet";
import { getCurrentUser } from "../lib/api/auth";

export const TweetsContext = createContext();

export const Home = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [tweets, setTweets] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentUser, setCurrentUser] = useState("");

  //ログインユーザーを取得
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        setCurrentUser(res.data.currentUser);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentUser();
  }, []);

  //全てのツイートと、ページネーションに必要な値を取得
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await getAllTweets(currentOffset);
        setTweets(res.data.tweets);
        setTotalCount(res.data.totalCount);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTweets();
  }, [currentOffset, totalCount]);

  return (
    <>
      <Row style={{ display: "flex" }}>
        <Col xs={12} className='border-bottom'>
          <h3>HOME</h3>
        </Col>
        <Col>
          <TweetForm setTotalCount={setTotalCount} currentUser={currentUser} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TweetsContext.Provider
            value={{
              totalCount,
              currentOffset,
              setCurrentOffset,
            }}>
            <TweetList
              tweets={tweets}
              totalCount={totalCount}
              currentOffset={currentOffset}
              setCurrentOffset={setCurrentOffset}
            />
          </TweetsContext.Provider>
        </Col>
      </Row>
    </>
  );
};
