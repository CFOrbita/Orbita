import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import Statistics from "./statistics/statistics.jsx";
import Cards from "./cards/cards.jsx";
import {connect} from "react-redux";
import cloneDeep from "lodash.clonedeep";
import {
  actionCancelTraining,
  actionDeleteTraining,
  actionSaveTraining,
  actionSetTrainings
} from "../../../reducer/trainings/trainingsData";
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";


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
    this.setTrainings = this.setTrainings.bind(this);
  }

  componentDidMount() {
    this.setTrainings()
  }

  setTrainings() {
    const {authUser} = this.props;
    this.setState({loading: true});

    this.props.firebase
      .trainings(authUser.uid)
      .once('value', snapshot => {
        let trainings = [];
        let values = snapshot.val();
        if (!!values) {
          trainings = Object.entries(values);
        }

        this.props.onSetTrainings(trainings);

        this.setState({loading: false});
      })
  }

  setNewId() {
    const trainings = this.props.trainings;

    if (trainings.length === 0) {
      return 1;
    } else {
      const lastIndex = trainings[trainings.length - 1][1].training.id;

      return lastIndex + 1;
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

  saveOnFirebase(authUser, training, key) {
    this.props.firebase.training(authUser.uid, key).update(
      {
        training,
        userId: authUser.uid,
        username: authUser.username,
        createdAt: this.props.firebase.serverValue.TIMESTAMP
      },
      function(error) {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  deleteOnFirebase(authUser, key) {
    this.props.firebase.training(authUser.uid, key).remove()
  }

  handleSaveTraining(training, fbId) {
    const {authUser} = this.props;
    const trainings = cloneDeep(this.props.trainings);
    const indexTraining = trainings.findIndex((item => item[0] === fbId));

    if (indexTraining === -1) {
      const fbId = this.props.firebase.trainings(authUser.uid).push().key;
      trainings.push([fbId, {training}]);
      this.saveOnFirebase(authUser, training, fbId);
    } else {
      trainings[indexTraining][1].training = training;
      this.saveOnFirebase(authUser, training, fbId);
    }

    this.props.onSaveTraining(trainings);

    this.setState(prev => {
      this.editingTraining = null;

      return {isEditing: !prev.isEditing}
    })
  }

  handleDeleteTraining(fbId) {
    const {authUser} = this.props;
    const trainings = this.props.trainings;
    const state = trainings.filter(item => item[0] !== fbId);

    this.deleteOnFirebase(authUser, fbId);
    this.props.onDeleteTraining(state);
  }

  handleEditTraining(fbId) {
    const trainings = this.props.trainings;
    const forEdit = trainings.filter(item => item[0] === fbId)[0];
    this.editingTraining = {fbId, training: forEdit[1].training};

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
          <Route exact path="/trainings" render={() => <Cards trainings={trainings}
                                                              isEditing={isEditing}
                                                              setNewId={this.setNewId}
                                                              editingTraining={this.editingTraining}
                                                              onAddNewTraining={this.handleAddNewTraining}
                                                              onSaveTraining={this.handleSaveTraining}
                                                              onCancel={this.handleCancel}
                                                              onEditTraining={this.handleEditTraining}
                                                              onDeleteTraining={this.handleDeleteTraining} />
          }/>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trainings: state.trainings,
    authUser: state.sessionState.authUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSetTrainings: (item) => {
    dispatch(actionSetTrainings(item));
  },
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

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Trainings);
