import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form } from "semantic-ui-react";
import { userLoginValidate } from '../../store/userAuth/actions';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

    handleSubmit(e) {
        e.preventDefault();
        console.log(`login submit ${this.state.username} ${this.state.password}`);

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            const userLogin = { username: username, password: password };
            dispatch(userLoginValidate(userLogin));
        }
    }

    render() {
        return (
            <div>
                <h2>Login Page</h2>
                <Form>
          <Form.Field>
          <label>{this.props.errorMsg}</label>
            <label>User Name</label>
            <input required placeholder="username" name="username" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input required placeholder="password" name="password" onChange={this.handleChange}/>
          </Form.Field>
          <Button type="submit" onClick={this.handleSubmit}>Login</Button>
          <p><Link to='/register'>Register</Link></p>
        </Form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const loginUser = state.userAuth;
    let user;
    let errorMsg = '';
    (loginUser.user) ?
        (user = loginUser.user) : (errorMsg = loginUser.loginResult);    

    return { user, errorMsg };  
}

export default connect(mapStateToProps)(Login);