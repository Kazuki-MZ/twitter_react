import React, { createContext, useState } from "react";
export const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState({
    message: [],
    type: "",
    open: false,
  });

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
  return (
    <FlashMessageContext.Provider
      value={{ flashMessage, createFlashMessage, resetFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
