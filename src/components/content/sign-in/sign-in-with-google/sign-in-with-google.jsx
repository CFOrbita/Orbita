import React, {Component} from 'react';
import {compose} from "recompose";
import {withRouter} from 'react-router-dom';

import * as ROUTES from "../../../../utils/constants/routes";
import {withFirebase} from "../../../Firebase";

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event)  {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={(e) => this.onSubmit(e)}>
        <button type="submit">Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

export { SignInGoogle };
