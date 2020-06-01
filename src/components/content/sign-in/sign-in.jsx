import React, {Component, useState} from 'react';
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

const SignInFormBase = ({firebase, history}) => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const isInvalid = password === '' || email === '';

  function onSubmit(event) {
    event.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setPassword('')
        setEmail('')
        setError(null)
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
  }

  return (
    <form className="sign-in__form" onSubmit={onSubmit}>
      <Input name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             type="text"
             placeholder="Email"/>
      <Input name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             type="password"
             placeholder="Password"/>
      <Button disabled={isInvalid}
              type="submit"
              text="Войти"/>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export {SignInForm};
