import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./header.css";

function Navbar({ account, balance }) {
  return (
    <nav className="navbar shadow fixed-top flex-md-nowrap">
      <Container>
        <Row>
          <Col>
            <img src="https://pbs.twimg.com/profile_images/1426265110281076741/tj6rMfWK_400x400.jpg"
              style={{
                width: '20%',
                height: '100%',
              }}
            />
          </Col>
          <Col>
            <h1 className="navbar-brand ">Balance: {(balance / 1e18).toFixed(4)}</h1>
          </Col>
          <Col>
            <h1 className="navbar-brand ">Account: {account}</h1>
          </Col>
        </Row>
      </Container>
    </nav>
  );
}

export default Navbar;
