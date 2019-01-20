import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { history } from './services/history';
import './App.css';
import AppContainer from './components/gameBet/SemanticTest';
import GameBet2 from './components/gameBet/GameBet2';
import Login from './components/login/Login';
import Register from './components/login/Register';

class App extends Component {
  render() {
    return (
      <Container>
      <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/gamebet" component={GameBet2} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
    </Container>
    );
  }
}

export default App;
