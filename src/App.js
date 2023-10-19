import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { Home } from "./components/Home";
import { FlashMessageProvider } from "./context/FlashMessageContext";

function App() {
  return (
    <div>
      <FlashMessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/api/v1/users' element={<SignUp />} />
            <Route path='/api/v1/users/sign_in' element={<SignIn />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </FlashMessageProvider>
    </div>
  );
}

export default App;
