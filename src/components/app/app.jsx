import React from "react";
import { Header } from "../header/header";
import Footer from "../footer/footer";
import Content from "../content/content";
import {withAuthentication} from '../content/session/index';

const App = () => {
  return (
    <div className="wrapper">
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );
}


export default withAuthentication(App);
