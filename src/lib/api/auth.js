import Cookies from "js-cookie";
import client from "./client";

// サインアップ
export const signUp = params => {
  return client.post("/api/v1/users", params);
};

//サインイン
export const signIn = params => {
  return client.post("/api/v1/users/sign_in", params);
};

//ログインユーザーのIDを取得
export const getCurrentUser = () => {
  return client.get("/api/v1/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
