import { useContext, React, useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Col, Row, Container, ButtonToggle } from "reactstrap";
import UserContext from "../context/userContext";
import { GoComment } from "react-icons/go";

const HomePage = (props) => {
  const { userData } = useContext(UserContext);
  const [forum, setForum] = useState();

  useEffect(async () => {
    fetch(`/posts/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log("posted successfully");
          console.log(res);
          setForum(res.body.reverse());
          console.log(res);
        }
      });
  }, []);

  const Forum = () => {
    if (!(forum === undefined)) {
      var map = forum;
      return map.map((data) => (
        <div className="mt-3">
          <GoComment />
          <Link to={`/forum/${data._id}`}>
            <a style={{ color: "black" }} className="mt-4">
              {" "}
              {data.title}
            </a>
          </Link>
          <div>
            <p style={{ display: "inline" }}>
              {" "}
              Posted: {data.created.substring(0, 10)}
            </p>
            <p>
              {" "}
              By: <p style={{ display: "inline" }}>{data.username}</p>
            </p>
          </div>
        </div>
      ));
    }
    return <h1></h1>;
  };
  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col>
            <div>
              <Forum />
            </div>
          </Col>
          <Col xs="auto">
            {userData.user === undefined ? (
              <div></div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Link to="/NewForum">
                  <ButtonToggle>New Forum</ButtonToggle>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
