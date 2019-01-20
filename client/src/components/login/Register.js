import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { userRegister } from "../../store/userAuth/actions";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: "",
        nickname: "",
        email: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
      console.log('register submit: ' + this.state.user.username);
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password && user.nickname && user.email) {
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
            <label>User Name</label>
            <input required placeholder="app username" name="username" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input required placeholder="app password" name="password" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input required placeholder="mjordan23@bulls.com" name="email" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Nickname</label>
            <input required placeholder="how shall we call you" name="nickname"  onChange={this.handleChange}/>
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
