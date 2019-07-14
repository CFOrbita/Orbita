import React from "react";

const Backdrop = props => {
  const {backDropClickHandler} = props;

  return (
    <div className="backdrop" onClick={backDropClickHandler}/>
  );
};

export default Backdrop;
