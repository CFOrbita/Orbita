import React from "react";
import withAuthorization from "../../hoc/with-authorization/with-authorization.jsx";

const Backdrop = props => {
  const {backDropClickHandler} = props;

  return (
    <div className="backdrop" onClick={backDropClickHandler}/>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Backdrop);
