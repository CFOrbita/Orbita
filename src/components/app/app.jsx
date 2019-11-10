import React, {Component} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Content from "../content/content";
import {withAuthentication} from '../content/session/index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="wrapper">
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}


export default withAuthentication(App);
