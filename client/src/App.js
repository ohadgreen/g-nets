import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { history } from "./services/history";
import "./App.css";
import AppContainer from "./components/gameBet/SemanticTest";
import Header from "./components/header/Header";
import GameBet2 from "./components/gameBet/GameBet2";
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
            <Route path="/gamebet" component={GameBet2} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
