import { atom } from "recoil";

export const flashMessageState = atom({
  key: "flashMessageState",
  default: {
    message: [],
    type: "",
    open: false,
  },
});
