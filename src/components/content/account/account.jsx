import React from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../utils/constants/routes";

const Account = (props) => (
  <div>
    <h1>Account</h1>
    <p>Ваш e-mail: {props.authUser.email}</p>
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
    <p>
      <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
    </p>
  </div>
);

export default Account;
