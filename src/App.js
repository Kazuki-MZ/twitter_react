import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { Home } from "./components/Home";
import { createContext, useState } from "react";

export const FlashMessageContext = createContext();

function App() {
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
    <div>
      <FlashMessageContext.Provider
        value={{ flashMessage, createFlashMessage, resetFlashMessage }}>
        <BrowserRouter>
          <Routes>
            <Route path='/api/v1/users' element={<SignUp />} />
            <Route path='/api/v1/users/sign_in' element={<SignIn />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </FlashMessageContext.Provider>
    </div>
  );
}

export default App;
