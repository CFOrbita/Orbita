import React from "react";
import {NavLink, Link} from "react-router-dom";
import PropTypes from "prop-types";
import DrawerToggleButton from "../side-drawer/drawer-toggle-button";
import SignOutButton from "../../content/sign-out/sign-out.jsx";
import {AuthUserContext} from '../../content/session/index';

const Toolbar = props => {
  const {drawerClickHandler} = props;

  return (
    <AuthUserContext.Consumer>
      {authUser => {
        return (
          <header className="toolbar">
            <nav className="toolbar__navigation">
              <div>
                <DrawerToggleButton onClick={drawerClickHandler}/>
              </div>
              <Link to="/" className="toolbar__logo">
                Orbita
              </Link>
              <div className="spacer"/>
              <ul className="toolbar__navigation-items">
                <li>
                  <NavLink to="/trainings">Trainings</NavLink>
                </li>
                <li>
                  <NavLink to="/fiteat">FitEat</NavLink>
                </li>
                {
                  !!authUser ?
                    <li>
                      <SignOutButton/>
                    </li>
                    :
                    null
                }
              </ul>
            </nav>
          </header>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

Toolbar.propTypes = {
  drawerClickHandler: PropTypes.func.isRequired
};

export default Toolbar;
