import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import { Home } from "./components/Home";
import { FlashMessageProvider } from "./context/FlashMessageContext";
import TweetDetail from "./components/TweetDetail";
import { Layout } from "./pages/Layout";
import { Profile } from "./components/Profile";

function App() {
  return (
    <div>
      <FlashMessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/api/v1/users' element={<SignUp />} />
            <Route path='/api/v1/users/sign_in' element={<SignIn />} />

            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/tweets/:id' element={<TweetDetail />} />
              <Route path='/profile/users/:userId' element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FlashMessageProvider>
    </div>
  );
}

export default App;
