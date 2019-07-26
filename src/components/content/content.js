import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import Trainings from "./trainings/trainings";
import FitEat from "./fiteat/fiteat";
import {actionDeleteTraining, actionSaveTraining} from "../../reducer/trainings/trainingsData";

class Content extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    }
  }

  render() {
    const {onSaveTraining, onDeleteTraining, trainings} = this.props;

    const trainingsProps = {onSaveTraining, onDeleteTraining, trainings};

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
  onSaveTraining: (item) => {
    dispatch(actionSaveTraining(item));
  },
  onDeleteTraining: (state) => {
    dispatch(actionDeleteTraining(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
