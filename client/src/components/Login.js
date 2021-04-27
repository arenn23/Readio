import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Container,
  Button,
} from "reactstrap";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../context/userContext";
import Header from "./Header";

const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(userContext);
  const history = useHistory();

  const submit = async (e) => {
    //Submits username and password to database in a try block. If successful, sets token and user into userContext and localStorage
    e.preventDefault();
    try {
      const loginRes = await Axios.post("/users/login", {
        userName,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user", loginRes.data.user.userName);
      history.push("/");
    } catch (err) {
      //If there is an err, it is caught and displayed for user.
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <Header />
      {/* Form that has a username and password. On submit, it send data to server to see if data matches a user in database.  */}
      <Container>
        {/* Will display error if submit has an error response */}
        <div className="mt-4" style={{ color: "red" }}>
          {error}
        </div>
        <Row>
          <Col lg={5} className="mt-4" style={{ margin: "auto" }}>
            <Form onSubmit={submit}>
              <FormGroup style={{ textAlign: "left" }}>
                <Label for="username">Username</Label>
                <Input
                  type="username"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </FormGroup>
              <FormGroup style={{ textAlign: "left" }}>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="psssword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button style={{ textAlign: "left" }}>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
