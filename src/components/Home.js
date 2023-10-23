import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Sidebar } from "./Sidebar";
import { TweetForm } from "./TweetForm";
export const Home = () => {
  return (
    <Container fluid>
      <Row className='vh-100'>
        <Col xs lg='2' className='border-end'>
          <Sidebar />
        </Col>
        <Col xs={10}>
          <Row style={{ display: "flex" }}>
            <Col xs={12} className='border-bottom'>
              <h3>HOME</h3>
            </Col>
            <Col>
              <TweetForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
