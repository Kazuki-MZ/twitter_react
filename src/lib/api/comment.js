import Cookies from "js-cookie";
import client from "./client";

export const createComment = params => {
  return client.post("/api/v1/comments", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
