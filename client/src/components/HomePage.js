import { useContext, React, useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Col, Row, Container, ButtonToggle } from "reactstrap";
import UserContext from "../context/userContext";
import { GoComment } from "react-icons/go";

const HomePage = (props) => {
  const { userData } = useContext(UserContext);
  const [forum, setForum] = useState();

  //Using the useEffect hook to fetch all post data when page loads. The second argument [] after the comma
  //makes sure this only fires once.
  useEffect(async () => {
    fetch(`/posts/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log("posted successfully");
          console.log(res);
          // Sets response data in forum object. Puts in reverse order so newest posts on top.
          setForum(res.body.reverse());
          console.log(res);
        }
      });
  }, []);

  const Forum = () => {
    // checks to see if forum is defined
    if (!(forum === undefined)) {
      var map = forum;
      //maps through forum data
      return map.map((data) => (
        <div className="mt-3">
          {/* One entry for each forum. Each has a GoComment symbol. Each links to 'forum/data_id', which is the individual forum page.  */}
          <GoComment />
          <Link to={`/forum/${data._id}`}>
            <a style={{ color: "black" }} className="mt-4">
              {" "}
              {data.title}
            </a>
          </Link>
          <div>
            {/* Displays data made */}
            <p style={{ display: "inline" }}>
              {" "}
              Posted: {data.created.substring(0, 10)}
            </p>
            <p>
              {" "}
              {/* Displays username */}
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
            {/* Conditional rendering. Looks to see if there is a user logged in. If so, renders it. If not, has a button to login */}
            {localStorage.getItem("user") === null ? (
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
