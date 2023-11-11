import { atom } from "recoil";

export const loginUserState = atom({
  key: "currentUserState",
  default: null,
});
