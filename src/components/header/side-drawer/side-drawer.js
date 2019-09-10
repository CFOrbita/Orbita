import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withAuthorization from "../../hoc/with-authorization/with-authorization.jsx";

const SideDrawer = props => {
  const {onShown} = props;
  const drawerClasses = ['side-drawer'];

  if (onShown) {
    drawerClasses.push('open');
  }

  return (
      <nav className={drawerClasses.join(' ')}>
          <ul className="side-drawer__items">
            <li>
              <NavLink to="/trainings">Тренировки</NavLink>
            </li>
            <li>
              <NavLink to="/fiteat">Питание</NavLink>
            </li>
            <li>
              <NavLink to="/contacts">Контакты</NavLink>
            </li>
          </ul>
      </nav>
  );
};

SideDrawer.propTypes = {
  onShown: PropTypes.bool.isRequired
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SideDrawer);
