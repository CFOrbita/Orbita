import React, { useState } from 'react';
import {withFirebase} from '../../Firebase/context';
import Input from "../../shared/input/input.jsx";
import Button from "../../shared/button/button.jsx";

const PasswordForgetPage = () => (
  <div className="pass-forget">
    <h1>Восстановление пароля</h1>
    <PasswordForgetForm/>
  </div>
);

const PasswordForgetFormBase = ({ firebase }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  function onSubmit(event) {
    firebase.doPasswordReset(email)
      .then(() => {
        setEmail('')
        setError(null)
      })
      .catch(error => {
        setError(error);
      });

    event.preventDefault();
  }

  const isInvalid = email === '';

  return (
    <form className="pass-forget__form" onSubmit={onSubmit}>
      <Input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <Button disabled={isInvalid} type="submit" text='Reset'/>
      {error && <p>{error.message}</p>}
    </form>
  );
}

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm};
