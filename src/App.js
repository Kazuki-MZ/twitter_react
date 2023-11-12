import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./pages/Layout";
import { RecoilRoot } from "recoil";
import { Home } from "./components/Home/Home";
import SignUp from "./components/Authentication/SignUp";
import SignIn from "./components/Authentication/SignIn";
import TweetDetail from "./components/tweets/TweetDetail";
import { Profile } from "./components/profile/Profile";

function App() {
  return (
    <div>
      <RecoilRoot>
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
      </RecoilRoot>
    </div>
  );
}

export default App;
