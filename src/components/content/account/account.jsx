import React from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../utils/constants/routes";
import {AuthUserContext} from "../session/index";
import {LoginManagement} from "../login-management/login-management.jsx";

const Account = (props) => (
  <AuthUserContext.Consumer>
    {
      authUser => (
        <div>
          <h1>Account</h1>
          <p>Ваш e-mail: {props.authUser.email}</p>
          <p>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
          </p>
          <p>
            <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
          </p>
          <LoginManagement authUser={authUser}/>
        </div>
      )
    }
  </AuthUserContext.Consumer>
);

export default Account;
