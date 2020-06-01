import React, { useState } from 'react';
import {withFirebase} from '../../Firebase/context';
import Input from "../../shared/input/input.jsx";
import Button from "../../shared/button/button.jsx";

const PasswordChangeForm = ({ firebase }) => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  function onSubmit(event) {
    firebase.doPasswordUpdate(passwordOne)
      .then(() => {
        setPasswordOne('')
        setPasswordTwo('')
        setError(null)
      })
      .catch(error => {
        setError(error)
      });

    event.preventDefault();
  }

  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '';

  return (
    <div className="pass-change">
      <h1 className="pass-change__title">Смена пароля</h1>
      <form className="pass-change__form" onSubmit={onSubmit}>
        <Input name="passwordOne"
               value={passwordOne}
               onChange={(e) => setPasswordOne(e.target.value)}
               type="password"
               placeholder="New Password"/>
        <Input name="passwordTwo"
               value={passwordTwo}
               onChange={(e) => setPasswordTwo(e.target.value)}
               type="password"
               placeholder="Confirm New Password"/>
        <Button disabled={isInvalid}
                type="submit"
                text="Change"/>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default withFirebase(PasswordChangeForm);
