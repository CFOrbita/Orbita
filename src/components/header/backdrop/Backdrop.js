import React from "react";
import {compose} from "recompose";
import {withAuthorization, withEmailVerification} from "../../content/session";

const Backdrop = props => {
  const {backDropClickHandler} = props;

  return (
    <div className="backdrop" onClick={() => backDropClickHandler(false)}/>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition))
(Backdrop);
