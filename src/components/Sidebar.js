import React, { useEffect, useState } from "react";
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
import { getCurrentUser } from "../lib/api/auth";

export const Sidebar = () => {
  //サイドバーをクリックした時はログインユーザーの情報を表示したいので、ログインユーザーのidを渡す
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();
        setCurrentUserId(res.data.currentUser.id);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentUser();
  }, []);

  const navigate = useNavigate();
  const movementCurrentUserProfile = () => {
    navigate(`/profile/users/${currentUserId}`);
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
