import React from "react";
import { connect } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import { userRegister } from "../../store/userAuth/actions";
import authService from "../../services/auth.service";
import { RenderAvatarImageOnly } from "../common/RenderAvatar";
import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
      email: "",
      avatar: ""
    },
    enableSubmit: false,
    avatarChoice: [],
    existingUsernames: [],
    submitted: false,
    errorMessage: ""
  };

  async componentDidMount() {
    let allExistingUsers = await authService.fetchAllUsers();
    console.log('avatar choices: ' + allExistingUsers.avatarChoice);
    this.setState({
      avatarChoice: allExistingUsers.avatarChoice,
      existingUsernames: allExistingUsers.allUsernames
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    const { user } = this.state;
    const enableSubmitBtn = (user.username !== "" && user.password !== "" && user.email !== "" && user.avatar !== "");
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
      enableSubmit: enableSubmitBtn
    });
  };

  handleSubmit = e => {
    // console.log("register submit: " + JSON.stringify(this.state.user));
    e.preventDefault();    
    const { user } = this.state;
    let validUser = true;
    
    if (user.username && user.password && user.email && user.avatar) {
      const userNameLengthValidation = this.stringWithinLengthLimit("username", user.username);
      if (userNameLengthValidation){
        this.setState({errorMessage: userNameLengthValidation})
        validUser = false;
      }
      const existUsernameValidation = this.existingUsernameValidation(user.username);
      if (existUsernameValidation) {
        this.setState({errorMessage: existUsernameValidation})
        validUser = false;
      }
      const passwordLengthValidation = this.stringWithinLengthLimit("password", user.password);
      if (passwordLengthValidation){
        this.setState({errorMessage: passwordLengthValidation})
        validUser = false;
      }
      const emailPatternValid = this.emailPatternValidation(user.email);
      if (emailPatternValid){
        this.setState({errorMessage: emailPatternValid})
        validUser = false;
      }
      
      if (validUser) {
        const { dispatch } = this.props;
        this.setState({ submitted: true });
        dispatch(userRegister(user));
      }
    }
  };

  stringWithinLengthLimit = (name, value) => {
    if(value.length < 3 || value.length > 12) {
      return `${name} should be between 3 - 12 characters`;
    }
    else return null;
  }

  existingUsernameValidation = value => {
    if(this.state.existingUsernames.includes(value)) {
      return "username already taken. Please choose a different one";
    }
    else return null;
  }

  emailPatternValidation = value => {
    const emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(value)) {
      return "email address not valid";
    }
    else return null;
  }

  handleAvatarChoice = e => {
    e.preventDefault(e.target.alt);
    const chosenAvatar = e.target.alt;
    const { user } = this.state;
    const enableSubmitBtn = (user.username !== "" && user.password !== "" && user.email !== "" && user.avatar !== "");
    this.setState({ user: { ...user, avatar: chosenAvatar}, enableSubmit: enableSubmitBtn });
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
        <Form error={this.state.errorMessage !== "" ? true : false}>
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
          
          <Button style={{marginTop: "10px"}} disabled={!this.state.enableSubmit} type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
          <Message error header="Oops..." content={this.state.errorMessage} />
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
