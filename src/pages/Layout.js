import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const Layout = () => {
  return (
    <Container fluid>
      <Row className='vh-100'>
        <Col xs lg='2' className='border-end'>
          <Sidebar />
        </Col>

        <Col xs={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};
