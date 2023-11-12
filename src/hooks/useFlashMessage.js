import { useSetRecoilState } from "recoil";
import { flashMessageState } from "../Atoms/flashmessage/FlashMessageState";

export const useFlashMessage = () => {
  const setFlashMessage = useSetRecoilState(flashMessageState);

  const createFlashMessage = (message, type, boolean) => {
    setFlashMessage(prevFlashMessage => ({
      ...prevFlashMessage,
      message: message,
      type: type,
      open: boolean,
    }));
  };

  const resetFlashMessage = () => {
    setFlashMessage(prevFlashMessage => ({
      ...prevFlashMessage,
      message: "",
      type: "",
      open: false,
    }));
  };
  return { resetFlashMessage, createFlashMessage };
};
