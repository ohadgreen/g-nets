import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./services/history";
import Header from "./components/header/Header";
import { GameBetContainer } from "./components/main/GameBetContainer";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="app-content">
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/gamebet" component={GameBetContainer} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
