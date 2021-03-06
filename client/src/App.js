import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./services/history";
import Header from "./components/header/Header";
import { AppGrid } from "./components/main/AppGrid";
import PastGames from "./components/common/PastGames";
import GameInstructions from "./components/common/GameInstructions";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import "./App.css";

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
            <Route path="/pastgames" component={PastGames} />
            <Route path="/rules" component={GameInstructions} />
            <Route path="/" component={AppGrid} />
          </Switch>
        </Router>
        </div>
      </div>
    );
  }
}

export default App;
