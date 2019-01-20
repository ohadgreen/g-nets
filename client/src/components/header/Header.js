import React from 'react';
import { connect } from 'react-redux';
import './header.css';
import { Button } from "semantic-ui-react";
import  * as authActions from '../../store/userAuth/actions';

class Header extends React.Component {
    logout = (e) => {
        e.preventDefault();
        console.log('logging out props: ' + JSON.stringify(this.props));
        this.props.dispatch(authActions.logout());
    }

    render() {
        const logoutBtn = this.props.user ? (<Button onClick={this.logout}>Logout</Button>) : '';
        const headerUser = (this.props.user && this.props.user.username )? `Welcome ${this.props.user.username}` : 'Please login or register';
        console.log('header user: ' + headerUser);
        return (
            <div className="header-grid">
                <div className="header-user">{headerUser}</div>
                <div>{logoutBtn}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const user = state.userAuth.user;
    return {
        user
    };
}
export default connect(mapStateToProps)(Header);