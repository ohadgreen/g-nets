import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import { userLoginValidate } from "../../store/userAuth/actions";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    submitted: false,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(`login submit ${this.state.username} ${this.state.password}`);
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      const userLogin = { username: username, password: password };
      dispatch(userLoginValidate(userLogin));
    }
  };

  render() {
    return (
      <div>
        <h2>Login:</h2>
        <Form error={this.props.errorMsg ? true : false}>
          <Form.Field>
            <Form.Input
              required={true}
              onChange={this.handleChange}
              label="User Name"
              name="username"
              placeholder="michael_23"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              required={true}
              onChange={this.handleChange}
              label="Password"
              name="password"
              type="password"
              placeholder="*****"
            />
          </Form.Field>
          <Message error header="Oops..." content={this.props.errorMsg} />
          <Button type="submit" disabled={this.state.name === "" || this.state.password === ""} onClick={this.handleSubmit}>
            Login
          </Button>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loginUser = state.userAuth;
  let user;
  let errorMsg;
  loginUser.user ? (user = loginUser.user) : (errorMsg = loginUser.loginResult);

  return { user, errorMsg };
}

export default connect(mapStateToProps)(Login);
