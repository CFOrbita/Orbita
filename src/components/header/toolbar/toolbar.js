import React from "react";
import {NavLink, Link} from "react-router-dom";
import PropTypes from "prop-types";
import DrawerToggleButton from "../side-drawer/drawer-toggle-button";
import SignOutButton from "../../content/sign-out/sign-out.jsx";
import * as ROUTES from "../../../utils/constants/routes";
import * as ROLES from "../../../utils/constants/roles";
import {connect} from "react-redux";

const Toolbar = props => {
  const {drawerClickHandler, authUser} = props;

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div>
          <DrawerToggleButton authUser={authUser} onClick={drawerClickHandler}/>
        </div>
        <Link to="/" className="toolbar__logo">
          Orbita
        </Link>
        <div className="spacer"/>
        <ul className="toolbar__navigation-items">
          <li>
            {authUser && <NavLink to="/trainings">Trainings</NavLink>}
          </li>
          <li>
            {authUser && <NavLink to="/fiteat">FitEat</NavLink>}
          </li>
          {authUser ? <li><Link to={ROUTES.ACCOUNT}>Account</Link></li> : null}
          {authUser && !!authUser.roles[ROLES.ADMIN] ? <li><Link to={ROUTES.ADMIN}>Admin</Link></li> : null}
          {authUser ? <li><SignOutButton/></li> : null}
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

Toolbar.propTypes = {
  drawerClickHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Toolbar);
