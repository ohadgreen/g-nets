import React from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { userRegister } from "../../store/userAuth/actions";
import authService from "../../services/auth.service";
import { RenderAvatarImageOnly } from "../common/RenderAvatar";
import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
      nickname: "",
      email: "",
      avatar: ""
    },
    avatarChoice: [],
    existingUsernames: [],
    submitted: false
  };

  async componentDidMount() {
    let allExistingUsers = await authService.fetchAllUsers();
    this.setState({
      avatarChoice: allExistingUsers.avatarChoice,
      existingUsernames: allExistingUsers.allUsernames
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  };

  handleSubmit = e => {
    // console.log("register submit: " + JSON.stringify(this.state.user));
    e.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.username && user.password && user.email && user.avatar) {
      dispatch(userRegister(user));
    }
  };

  handleAvatarChoice = e => {
    e.preventDefault(e.target.alt);
    const chosenAvatar = e.target.alt;
    const { user } = this.state;
    this.setState({ user: { ...user, avatar: chosenAvatar} });
  }

  renderAvatarChoice = () => {
    if (this.state.avatarChoice.length > 0) {
      return <div className="avatar-choice-main">{this.state.avatarChoice.map((avatar, i) => {
        return (
        <div key={i}><button className="avatar-button" onClick={this.handleAvatarChoice}><RenderAvatarImageOnly avatar={avatar} /></button></div>                  
          )
      })}
      </div>
    }
  };

  render() {
    return (
      <div className="form-main">
        <h3>Registration</h3>
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
          <Form.Field label="choose avatar" required={true}/>{this.renderAvatarChoice()}
          
          <Button style={{marginTop: "10px"}} type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
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
