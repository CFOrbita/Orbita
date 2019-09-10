import React from 'react';
import {withRouter} from 'react-router-dom';
import {withFirebase} from '../../Firebase/context';
import * as ROUTES from "../../../utils/constants/routes";
import {compose} from "recompose";

const SignOutButton = (props) => {
  const {firebase, history} = props;

  function doSignOut() {
    firebase.doSignOut();
    history.push(ROUTES.HOME);
  }

  return (
    <button type="button" onClick={doSignOut}>
      Sign Out
    </button>
  )
};

export default compose(
  withRouter,
  withFirebase,
)(SignOutButton);
