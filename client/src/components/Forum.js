import React, { useState, useEffect, useContext } from "react";
import { withRouter, useHistory } from "react-router";
import { GoComment } from "react-icons/go";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { useParams } from "react-router-dom";
import Header from "./Header";
import UserContext from "../context/userContext";
import { set } from "mongoose";

const Forum = (props) => {
  let [count, setCount] = useState(0);
  let [err, setErr] = useState();
  let [getPost, setGetPost] = useState({});
  let [getComments, setComments] = useState({});
  let { id } = useParams();

  useEffect(async () => {
    fetch(`/posts/${id}/comments`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setComments(res);
          console.log("hello");
        }
      });
    fetch(`/posts/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log(res);
          setGetPost(res);
          setTimeout(() => {
            setErr("");
          }, 5000);
        }
      });
  }, [count]);

  const submitPost = (event) => {
    event.preventDefault();
    setCount(count + 1);
    let post = {};
    post.text = event.target.textBody.value;
    post.post = id;
    post.created = Date.now();
    if (post.text === "") {
      setErr("Please enter a comment");
    }
    if (localStorage.getItem("user") === null) {
      setErr("Must be logged in");
    }
    if (!(localStorage.getItem("user") === null)) {
      if (post.text) {
        post.username = localStorage.getItem("user");
        fetch(`/posts/${id}/comments`, {
          method: "POST",
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setErr("Posted Successfully - see bottom of page");
              setTimeout(() => {
                window.location.reload(false);
              }, 2000);
            } else {
              setErr(
                "You are not authorized to post. Please provide a legitimate login"
              );
            }
          });
      }
    }
  };

  const Comments = () => {
    if (!(getComments.comments === undefined)) {
      var map = getComments.comments;
      return map.map((data) => (
        <div className="mt-3" style={{ display: "block" }}>
          <GoComment />
          <p style={{ display: "inline", fontSize: "20px" }}> {data.text} </p>
          <div>
            <p style={{ display: "inline" }}>
              Posted: {data.created.substring(0, 10)}
            </p>
            <p
              style={{
                display: "inline",
              }}
            >
              {" "}
              By {data.username}
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
      <Container>
        <Row>
          <Col style={{ borderBottom: "1px solid" }} className="mt-5">
            <GoComment />
            {getPost.body === undefined ? (
              <h4></h4>
            ) : (
              <h4 className="ml-4" style={{ display: "inline" }}>
                {getPost.body.title}
              </h4>
            )}
            {getPost.body === undefined ? (
              <h4></h4>
            ) : (
              <div className="ml-4" style={{ display: "inline" }}>
                Posted: {" " + getPost.body.created.substring(0, 10) + " "}
                By{" "}
                <p style={{ display: "inline" }}>
                  {" " + getPost.body.username}
                </p>
              </div>
            )}
            {getPost.body === undefined ? (
              <h4></h4>
            ) : (
              <p className="ml-4 mt-2">{getPost.body.text}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 style={{ color: "red" }}>{err}</h5>
            <Form onSubmit={submitPost}>
              <FormGroup>
                <Label for="textBody"></Label>
                <Input
                  type="textarea"
                  name="textBody"
                  id="textBody"
                  placeholder="Reply"
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <div className="mt-3">
            <Comments />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Forum);
