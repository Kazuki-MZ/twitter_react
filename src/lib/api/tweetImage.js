import client from "./client";

//画像アップロード
export const createImage = params => {
  return client.post("/api/v1/images", params, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
