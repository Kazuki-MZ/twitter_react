import client from "./client";

// サインアップ
export const signUp = params => {
  return client.post("/api/v1/users", params);
};

//サインイン
export const signIn = params => {
  return client.post("/api/v1/users/sign_in", params);
};
