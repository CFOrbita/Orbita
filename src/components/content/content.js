import React, {Component} from "react";
import {Route} from "react-router-dom";
import Trainings from "../trainings/trainings";
import FitEat from "../fiteat/fiteat";

class Content extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    }
  }

  render() {

    return (
        <main className="main">
          <p className="main__fake-text">Нужно войти в личный кабинет или зарегестрироваться</p>
          <Route path="/trainings" component={Trainings} />
          <Route path="/fiteat" component={FitEat} />
        </main>
    );
  }
}

export default Content;
