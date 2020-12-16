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
import { useHistory, withRouter } from "react-router-dom";
import userContext from "../context/userContext";
import Header from "./Header";

function Register() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(userContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { userName, password };
      console.log(newUser);
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        userName,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      <Header />
      <Container>
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
}

export default withRouter(Register);
