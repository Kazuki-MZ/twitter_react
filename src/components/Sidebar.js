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

export const Sidebar = () => {
  return (
    <Nav style={{ display: "flex", fontSize: "2vw" }}>
      <ul>
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
            <GrHomeRounded />
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
          <Nav.Link>
            <BsPersonFill color='black' />
          </Nav.Link>
        </Nav.Item>
      </ul>
    </Nav>
  );
};
