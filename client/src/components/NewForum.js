import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import Header from "./Header";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import UserContext from "../context/userContext";

const NewForum = (props) => {
  const [err, setErr] = useState();

  const submitPost = (event) => {
    event.preventDefault();
    let post = {};
    //Gets data from from
    post.title = event.target.title.value;
    post.text = event.target.textBody.value;
    post.created = Date.now();
    //checks to see if user logged in
    if (localStorage.getItem("user") === null) {
      setErr("Must be logged in");
    }
    //If all is good, sends post request to "posts/new endpoint"
    if (!(localStorage.getItem("user") === null)) {
      if (post.title && post.text) {
        post.author = localStorage.getItem("user");
        post.username = localStorage.getItem("user");
        fetch("/posts/new", {
          method: "POST",
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        })
          .then((res) => res.json())
          .then((res) => {
            //if posted successfully, navigates to forum`s page
            if (res.success) {
              console.log("posted successfully");
              console.log(res);
              props.history.push(`/forum/${res.body._id}`);
            } else {
              //the following is rare error someone would recieve if they typed in a username directly to local storage.
              //However, they would not have a valid authorization token. This is checked on the back end. Only someone with malicious intent
              //would receive this error.
              setErr(
                "You are not authorized to post. Please provide a legitimate login. We are watching..."
              );
              event.preventDefault();
            }
          });
      } else {
        setErr("Please enter a title and body!");
      }
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-4">
          <Col></Col>
          <Col xs="6">
            <h5 style={{ color: "red" }}>{err}</h5>
            <Form onSubmit={submitPost}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="input"
                  name="title"
                  id="title"
                  placeholder="Enter Title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="textBody">Body</Label>
                <Input
                  type="textarea"
                  name="textBody"
                  id="textBody"
                  placeholder="Enter Comments"
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(NewForum);
