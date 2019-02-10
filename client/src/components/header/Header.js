import React from 'react';
import { connect } from 'react-redux';
import './header.css';
import  * as authActions from '../../store/userAuth/actions';

class Header extends React.Component {
    logout = (e) => {
        e.preventDefault();
        this.props.dispatch(authActions.logout());
    }

    render() {
        const logoutLink = this.props.user ? 'Logout' : '';
        const headerUser = (this.props.user && this.props.user.username )? `Welcome ${this.props.user.username}` : 'Please login or register';
        return (
            <div className="header-grid">
            <div className="app-logo">NETS:BETS</div>
                <div className="header-user">{headerUser}</div>
                <div><a href="#" onClick={this.logout}>{logoutLink}</a></div>
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