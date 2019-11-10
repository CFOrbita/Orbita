import React from "react";

const DrawerToggleButton = props => {
  const {onClick, authUser} = props;

  return (
    <button className="toggle-button"
            disabled={authUser === null}
            onClick={onClick}>
      <div className="toggle-button__line"/>
      <div className="toggle-button__line"/>
      <div className="toggle-button__line"/>
    </button>
  );
};


export default DrawerToggleButton;
