import client from "./client";

//id指定でユーザー情報を取得
export const getUser = (id, offset) => {
  return client.get(`/api/v1/users/${id}`, {
    params: {
      offset: offset,
    },
  });
};
