import React, { Component } from "react";
import HomePage from "./HomePage";
import Register from "./Register";
import Login from "./Login";
import NewForum from "./NewForum";
import Forum from "./Forum";
import { Switch, Route } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <>
        <Switch className="body">
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/newForum" render={() => <NewForum />} />
          <Route exact path="/forum/:id" render={() => <Forum />} />
        </Switch>
      </>
    );
  }
}

export default Routing;
