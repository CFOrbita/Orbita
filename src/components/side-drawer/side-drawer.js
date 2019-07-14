import React from "react";

const SideDrawer = props => {
  const {onShown} = props;
  const drawerClasses = ['side-drawer'];

  if(onShown) {
    drawerClasses.push('open');
  }

  return (
    <nav className={drawerClasses.join(' ')}>
      <ul className="side-drawer__items">
        <li>
          <a href="/">Тренировки</a>
        </li>
        <li>
          <a href="/">Питание</a>
        </li>
        <li>
          <a href="/">Контакты</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
