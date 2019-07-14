import React from "react";

const DrawerToggleButton = props => {
  const {onClick} = props;
  return (
    <button className="toggle-button" onClick={onClick}>
      <div className="toggle-button__line"/>
      <div className="toggle-button__line"/>
      <div className="toggle-button__line"/>
    </button>
  );
}


export default DrawerToggleButton;
