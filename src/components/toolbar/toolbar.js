import React from "react";
import PropTypes from "prop-types";
import DrawerToggleButton from "../side-drawer/drawer-toggle-button";

const Toolbar = props => {
  const {drawerClickHandler} = props;

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div>
          <DrawerToggleButton onClick={drawerClickHandler}/>
        </div>
        <a href="/" className="toolbar__logo">
          Orbita
        </a>
        <div className="spacer"/>

        <ul className="toolbar__navigation-items">
          <li><a href="/">Trainings</a></li>
          <li><a href="/">FitEat</a></li>
        </ul>

      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  drawerClickHandler: PropTypes.func.isRequired
};

export default Toolbar;
