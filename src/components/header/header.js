import React, {Component} from "react";
import Toolbar from "../toolbar/toolbar";
import SideDrawer from "../side-drawer/side-drawer";
import Backdrop from "../backdrop/Backdrop";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideDrawerOpen: false
    };

    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backDropClickHandler = this.backDropClickHandler.bind(this);
  }

  drawerToggleClickHandler()  {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  };

  backDropClickHandler() {
    this.setState({
      sideDrawerOpen: false
    })
  }

  render() {
    let backdrop;
    const {sideDrawerOpen} = this.state;

    if (sideDrawerOpen) {
      backdrop = <Backdrop backDropClickHandler={this.backDropClickHandler}/>;
    }

    return (
      <React.Fragment>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer onShown={sideDrawerOpen} />
        {backdrop}
      </React.Fragment>
    );
  }
}

export default Header;
