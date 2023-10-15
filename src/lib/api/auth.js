import client from "./client";

// サインアップ
export const signUp = params => {
  return client.post("/users", params);
};
