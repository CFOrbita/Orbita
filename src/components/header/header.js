import React, { useState } from "react";
import Toolbar from "./toolbar/toolbar";
import SideDrawer from "./side-drawer/side-drawer";
import Backdrop from "./backdrop/Backdrop";

export const Header = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <>
      <Toolbar drawerClickHandler={setSideDrawerOpen}/>
      <SideDrawer onShown={sideDrawerOpen}/>
      {sideDrawerOpen && <Backdrop backDropClickHandler={setSideDrawerOpen}/>}
    </>
  )
};
