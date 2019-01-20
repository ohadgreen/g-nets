import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { userRegister } from "../../store/userAuth/actions";

class Register extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
      nickname: "",
      email: ""
    },
    submitted: false 
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit = (e) => {
      console.log('register submit: ' + this.state.user.username);
    e.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password && user.email) {
      dispatch(userRegister(user));
    }
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <h2>Registration</h2>
        <Form>
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
              placeholder="*****"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              required={true}
              onChange={this.handleChange}
              label="email"
              name="email"
              placeholder="mjordan@bulls.org"
            />
          </Form.Field>
          <Button type="submit" onClick={this.handleSubmit}>Register</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.userAuth;
  return {
    registering
  };
}

export default connect(mapStateToProps)(Register);
