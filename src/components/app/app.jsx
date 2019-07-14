import React, {Component} from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../side-drawer/side-drawer";
import Backdrop from "../backdrop/Backdrop";

class App extends Component{
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

    if(sideDrawerOpen) {
      backdrop = <Backdrop backDropClickHandler={this.backDropClickHandler}/>;
    }
    return (
      <React.Fragment>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <SideDrawer onShown={sideDrawerOpen} />
        {backdrop}
        <main style={{marginTop: '64px'}}>
          <p>Нужно войти в личный кабинет или зарегестрироваться (справа в углу)</p>
        </main>
        <footer className="footer">
          <div className="footer-wrapper container">
            <ul className="footer__list">
              <li className="footer__list-item">
                <a className="footer__list-link" href="donation.html">
                  Пожертвовать
                </a>
              </li>
              <li className="footer__list-item">
                <a className="footer__list-link" href="wishes.html">
                  Пожелания
                </a>
              </li>
              <li className="footer__list-item">
                <a className="footer__list-link contacts" href="#">
                  Контакты
                </a>
              </li>
            </ul>
            <p className="footer__text">Designed by Dimasick & Maxsick</p>
            <p className="footer__text">2018г. Все права защищены. Перепечатка запрещена.</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
