import React, { useState } from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";
import * as Messages from "../../../utils/constants/messages";
import * as ROUTES from "../../../utils/constants/routes";
import * as ROLES from '../../../utils/constants/roles';
import Input from "../../shared/input/input.jsx";
import Button from "../../shared/button/button.jsx";

const SignUpPage = () => (
  <div className="sign-up">
    <h1>Регистрация</h1>
    <SignUpForm/>
  </div>
);

const SignUpFormBase = ({firebase, history}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles
          });
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then(() => {
        setUsername('')
        setEmail('')
        setPasswordOne('')
        setPasswordTwo('')
        setIsAdmin(false)
        setError(null)

        history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === Messages.accountExistViaEmail.ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = Messages.accountExistViaEmail.ERROR_MSG_ACCOUNT_EXISTS;
        }

        setError(error);
      });
  }

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form className="sign-up__form" onSubmit={onSubmit}>
      <Input name="username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             type="text"
             placeholder="Full Name"/>
      <Input name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             type="text"
             placeholder="Email Address"/>
      <Input name="passwordOne"
             value={passwordOne}
             onChange={(e) => setPasswordOne(e.target.value)}
             type="password"
             placeholder="Password"/>
      <Input name="passwordTwo"
             value={passwordTwo}
             onChange={(e) => setPasswordTwo(e.target.value)}
             type="password"
             placeholder="Confirm Password"/>

      <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
      </label>
      <Button type="submit"
              disabled={isInvalid}
              text="Зарегистрироваться"/>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm};
