import React from 'react';
import {Link} from "react-router-dom";
import * as ROUTES from "../../../utils/constants/routes";
import {withAuthorization} from "../session/index";
import {LoginManagement} from "../login-management/login-management.jsx";
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";
import * as ROLES from "../../../utils/constants/roles";

const Account = ({authUser}) => {
  return (
    <div>
      <h1>Account</h1>
      <p>Ваш e-mail: {authUser.email}</p>
      <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
      </p>
      <p>
        <Link to={ROUTES.PASSWORD_CHANGE}>Change Password</Link>
      </p>
      <LoginManagement authUser={authUser}/>
    </div>
  )
};

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(Account);
