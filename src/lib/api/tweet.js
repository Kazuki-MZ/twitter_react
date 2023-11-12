import Cookies from "js-cookie";
import client from "./client";

//ツイート作成
export const createTweet = params => {
  return client.post("/api/v1/tweets", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

//offsetによってツイートを5件取得
export const getAllTweets = offset => {
  return client.get("/api/v1/tweets", {
    params: {
      offset: offset,
    },
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

//ツイート詳細
export const getDetailTweet = id => {
  return client.get(`/api/v1/tweets/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

//ツイート削除
export const deleteTweet = id => {
  return client.delete(`/api/v1/tweets/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
