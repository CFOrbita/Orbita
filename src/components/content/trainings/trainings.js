import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import Statistics from "./statistics/statistics.jsx";
import Cards from "./cards/cards.jsx";
import {connect} from "react-redux";
import {actionCancelTraining, actionDeleteTraining, actionSaveTraining} from "../../../reducer/trainings/trainingsData";


class Trainings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.editingTraining = null;

    this.handleAddNewTraining = this.handleAddNewTraining.bind(this);
    this.handleSaveTraining = this.handleSaveTraining.bind(this);
    this.handleDeleteTraining = this.handleDeleteTraining.bind(this);
    this.handleEditTraining = this.handleEditTraining.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setNewId = this.setNewId.bind(this);
  }

  setNewId() {
    const trainings = [...this.props.trainings];
    let id = 0;

    if (trainings.length === 0) {
      return 1;
    } else {
      trainings.forEach((item) => {
        if (item.id > id) {
          id = item.id
        }
      });

      return id + 1;
    }
  }

  handleAddNewTraining(e) {
    const {isEditing} = this.state;
    if (isEditing) {
      e.preventDefault();
      return;
    }

    this.setState(prev => {
      return {isEditing: !prev.isEditing}
    })
  }

  handleCancel() {
    this.props.onCancelTraining();
    this.editingTraining = null;

    this.setState(prev => {
      return {isEditing: !prev.isEditing}
    })
  }

  handleSaveTraining(training) {
    const trainings = [...this.props.trainings];
    const indexTraining = trainings.findIndex((item => item.id === training.id));

    if(indexTraining === -1) {
      trainings.push(training)
    } else {
      trainings[indexTraining] = training;
    }

    this.props.onSaveTraining(trainings);

    this.setState(prev => {
      this.editingTraining = null;

      return {isEditing: !prev.isEditing}
    })
  }

  handleDeleteTraining(id) {
    const trainings = [...this.props.trainings];
    const state = trainings.filter(item => item.id !== id);

    this.props.onDeleteTraining(state);
  }

  handleEditTraining(id) {
    const trainings = [...this.props.trainings];
    this.editingTraining = trainings.filter(item => item.id === id)[0];

    this.setState(prev => {
      return {isEditing: !prev.isEditing}
    })
  }

  render() {
    const {trainings} = this.props;
    const {isEditing} = this.state;

    return (
      <React.Fragment>
        <div className="training">
          <ul className="training-points">
            <li className="training-points__item">
              <Link to="/trainings" className="training-points__link">Журнал</Link>
            </li>
            <li className="training-points__item">
              <Link to="/trainings/statistics" className="training-points__link">Статистика</Link>
            </li>
            <li className="training-points__item">
              <a className="training-points__link" href="#">Тестирование</a>
            </li>
          </ul>

          <Route path="/trainings/statistics" render={() => <Statistics trainings={trainings}/> } />
          <Route exact path="/trainings" render={() => {
             return (
               <Cards
                 trainings={trainings}
                 isEditing={isEditing}
                 setNewId={this.setNewId}
                 editingTraining={this.editingTraining}
                 onAddNewTraining={this.handleAddNewTraining}
                 onSaveTraining={this.handleSaveTraining}
                 onCancel={this.handleCancel}
                 onEditTraining={this.handleEditTraining}
                 onDeleteTraining={this.handleDeleteTraining}
               />
             );
          }}/>

        </div>
      </React.Fragment>
    )
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
  onCancelTraining: () => {
    dispatch(actionCancelTraining());
  },
  onDeleteTraining: (state) => {
    dispatch(actionDeleteTraining(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trainings);
