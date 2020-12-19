import React, { useContext, useEffect } from "react";
import { Container, Row, Col, ButtonToggle } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.clear();
  };

  return (
    <Container fluid={true}>
      <Row style={{ textAlign: "center", backgroundColor: "#00FFFF" }}>
        <Col>
          <Link to="/">
            <h1 style={{ color: "black" }}>Read.io</h1>
          </Link>
        </Col>
        <Col>
          {localStorage.getItem("user") === null ? (
            <div>
              <Link to="/login">
                <ButtonToggle style={{ marginTop: "10px" }} color="secondary">
                  Login
                </ButtonToggle>
              </Link>
              <Link to="/register">
                <ButtonToggle style={{ marginTop: "10px" }} color="secondary">
                  Register
                </ButtonToggle>
              </Link>
            </div>
          ) : (
            <div>
              <h5
                className="mr-4 "
                style={{
                  display: "inline",
                  verticalAlign: "middle",
                }}
              >
                Hello, {localStorage.getItem("user")}
              </h5>
              <ButtonToggle
                onClick={logout}
                style={{ marginTop: "10px", verticalAlign: "middle" }}
                color="secondary"
              >
                Logout
              </ButtonToggle>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
