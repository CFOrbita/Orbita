import React from 'react';
import {compose} from "recompose";
import {Route, Switch} from "react-router-dom";
import { withFirebase } from '../../Firebase/context';
import {withAuthorization, withEmailVerification} from "../../content/session/index";
import * as ROLES from "../../../utils/constants/roles";
import * as ROUTES from "../../../utils/constants/routes";
import UserListBase from "./user-list/user-list.jsx";
import UserItemBase from "./user-item/user-item.jsx";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
