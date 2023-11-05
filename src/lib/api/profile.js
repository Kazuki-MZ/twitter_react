import Cookies from "js-cookie";
import client from "./client";

//プロフィール更新
export const updateProfile = params => {
  return client.patch("/api/v1/profile", params, {
    headers: {
      "content-type": "multipart/form-data",
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
