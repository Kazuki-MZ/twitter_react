import React from "react";
import { Nav } from "react-bootstrap";
//icon
import { FaSquareXTwitter } from "react-icons/fa6";
import { GrHomeRounded } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";
import { GrNotification } from "react-icons/gr";
import { GrMailOption } from "react-icons/gr";
import { GrBookmark } from "react-icons/gr";
import { BsPersonFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserState } from "../../Atoms/user/LoginUserState";

export const Sidebar = () => {
  //サイドバーをクリックした時はログインユーザーの情報を表示したいので、ログインユーザーを取得
  const loginUser = useRecoilValue(loginUserState);

  const navigate = useNavigate();
  const movementCurrentUserProfile = () => {
    navigate(`/profile/users/${loginUser.id}`);
  };

  const movementHome = () => {
    navigate("/");
  };
  return (
    <Nav style={{ display: "flex", justifyContent: "center", fontSize: "2vw" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <Nav.Item style={{ textAlign: "center" }}>
          <FaSquareXTwitter />
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <GrSearch />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <GrHomeRounded onClick={movementHome} />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <GrNotification />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <GrMailOption />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <GrBookmark />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link onClick={movementCurrentUserProfile}>
            <BsPersonFill color='black' />
          </Nav.Link>
        </Nav.Item>
      </ul>
    </Nav>
  );
};
