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
