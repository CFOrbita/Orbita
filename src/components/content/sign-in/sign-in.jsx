import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../../Firebase/context';
import * as ROUTES from "../../../utils/constants/routes";
import {SignInGoogle} from "./sign-in-with-google/sign-in-with-google.jsx";
import Input from "../../shared/input/input.jsx";
import Button from "../../shared/button/button.jsx";


const SignInPage = () => (
  <div className="sign-in">
    <h1>Авторизация</h1>
    <SignInForm/>
    <SignInGoogle/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const {email, password} = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({...INITIAL_STATE});
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({error});
      });
  };

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {email, password, error} = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <form className="sign-in__form" onSubmit={this.onSubmit}>
        <Input name="email"
               value={email}
               onChange={this.onChange}
               type="text"
               placeholder="Email" />
        <Input name="password"
               value={password}
               onChange={this.onChange}
               type="password"
               placeholder="Password" />
        <Button disabled={isInvalid}
                type="submit"
                text="Войти" />

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export {SignInForm};
