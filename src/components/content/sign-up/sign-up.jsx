import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";
import * as Messages from "../../../utils/constants/messages";
import * as ROUTES from "../../../utils/constants/routes";
import * as ROLES from '../../../utils/constants/roles';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const { username, email, passwordOne, isAdmin  } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles
          });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === Messages.accountExistViaEmail.ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = Messages.accountExistViaEmail.ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox(event) {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button type="submit" disabled={isInvalid}>Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm };