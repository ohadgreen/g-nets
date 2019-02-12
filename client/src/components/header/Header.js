import React from "react";
import { connect } from "react-redux";
import { Router, Link } from "react-router-dom";
import { history } from "../../services/history";
import "./header.css";
import * as authActions from "../../store/userAuth/actions";
import { RenderAvatar } from "../common/RenderAvatar";

class Header extends React.Component {
  logout = e => {
    e.preventDefault();
    this.props.dispatch(authActions.logout());
  };

  render() {
    const logoutLink = this.props.user ? "Logout" : "";
    const headerUser =
      this.props.user && this.props.user.username && this.props.user.avatar
        ? <RenderAvatar user={this.props.user} />
        : "Please login or register";
    return (
      <Router history={history}>
        <div className="header-grid">
          <div className="app-logo">
            <Link to="/">NETS:BETS</Link>
          </div>
          <div className="header-menu">
           
              <Link to="/pastgames">Past Games</Link>
           
              <Link to="/rules">Game Rules</Link>
            
            <a href="#" onClick={this.logout}>
              {logoutLink}
            </a>
          </div>
          <div className="header-user">{headerUser}</div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const user = state.userAuth.user;
  return {
    user
  };
}
export default connect(mapStateToProps)(Header);
