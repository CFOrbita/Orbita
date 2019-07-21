import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import Trainings from "./trainings/trainings";
import FitEat from "./fiteat/fiteat";
import {actionSaveTrainings} from "../../reducer/trainings/trainings";

class Content extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    }
  }

  render() {
    const {onSaveTrainings, trainings} = this.props;

    const trainingsProps = {onSaveTrainings, trainings};

    return (
        <main className="main">
          <p className="main__fake-text">Нужно войти в личный кабинет или зарегестрироваться</p>
          <Route path="/trainings" render={() => <Trainings {...trainingsProps}/>} />
          <Route path="/fiteat" component={FitEat} />
        </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trainings: state.trainings,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSaveTrainings: (item) => {
    dispatch(actionSaveTrainings(item));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
