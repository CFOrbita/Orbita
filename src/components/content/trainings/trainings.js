import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Statistics from "./statistics/statistics.jsx";
import { Cards } from "./cards/cards.jsx";
import {connect} from "react-redux";
import cloneDeep from "lodash.clonedeep";
import {TrainingContext, EditingCardContext} from '../../../context'
import {
  actionLoadingTrainings,
  actionCancelTraining,
  actionDeleteTraining,
  actionSaveTrainings,
  actionSetTrainings
} from "../../../reducer/trainings/trainingsData";
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";
import withAuthorization from "../../hoc/with-authorization/with-authorization.jsx";


const Trainings = ({isLoading, trainings, authUser, match, firebase, onLoadingChange, onSetTrainings, onCancelTraining, onSaveTraining, onDeleteTraining}) => {
  const [isEditing, setEditing] = useState(false);
  const [isAdding, setAdding] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const {url, path} = match;

  useEffect(getTrainings, []);

  function getTrainings() {
    onLoadingChange(true);

    firebase
      .trainings(authUser.uid)
      .once('value', snapshot => {
        let trainings = [];
        let values = snapshot.val();
        if (!!values) {
          trainings = Object.entries(values);
        }

        onSetTrainings(trainings);

        onLoadingChange(false);
      })
  }

  function setNewId() {
    if (trainings.length === 0) {
      return 1;
    } else {
      const lastIndex = trainings[trainings.length - 1][1].training.id;

      return lastIndex + 1;
    }
  }

  function handleAddNewTraining(e) {
    if (isEditing) {
      e.preventDefault();
      return;
    }
    setAdding(prevState => !prevState)
  }

  function handleCancel() {
    onCancelTraining();
    setEditingTraining(null);

    setEditing(prevState => !prevState)
  }

  function saveOnFirebase(authUser, training, key) {
    return firebase.training(authUser.uid, key).update(
      {
        training,
        userId: authUser.uid,
        username: authUser.username,
        createdAt: firebase.serverValue.TIMESTAMP
      },
      (error) => console.error(error)
    )
  }

  function deleteOnFirebase(authUser, key) {
    firebase.training(authUser.uid, key).remove()
  }

  function handleSaveTraining(training, fbId) {
    onLoadingChange(true);

    const clonedTrainings = cloneDeep(trainings);
    const indexTraining = clonedTrainings.findIndex((item => item[0] === fbId));

    if (indexTraining === -1) {
      const fbId = firebase.trainings(authUser.uid).push().key;
      clonedTrainings.push([fbId, {training}]);

      saveOnFirebase(authUser, training, fbId).then(() => onLoadingChange(false));
    } else {
      clonedTrainings[indexTraining][1].training = training;

      saveOnFirebase(authUser, training, fbId).then(() => onLoadingChange(false));
    }

    onSaveTraining(clonedTrainings);

    setEditingTraining(null);
    if (isEditing) setEditing(prevState => !prevState)
    else setAdding(prevState => !prevState)
  }

  function handleDeleteTraining(fbId) {
    if (isEditing) return
    const training = trainings.filter(item => item[0] !== fbId);

    deleteOnFirebase(authUser, fbId);
    onDeleteTraining(training);
  }

  function handleEditTraining(fbId) {
    const forEdit = trainings.filter(item => item[0] === fbId)[0];

    if (isEditing) {
      setEditingTraining(null);
      setEditing(prevState => !prevState)
    }
    else {
      setEditingTraining({fbId, training: forEdit[1].training});

      window.scrollTo({top: 0, behavior: "smooth"});
      setEditing(prevState => !prevState)
    }
  }


  return (
    <>
      <div className="training">
        <ul className="training-points">
          <li className="training-points__item">
            <Link to={`${url}/dashboard`} className="training-points__link">Журнал</Link>
          </li>
          <li className="training-points__item">
            <Link to={`${url}/statistics`} className="training-points__link">Статистика</Link>
          </li>
          <li className="training-points__item">
            <a className="training-points__link" href="#">Тестирование</a>
          </li>
        </ul>

        <div className="trainings-screen">
          {<TrainingContext.Provider value={{
            trainings,
            isLoading,
            setNewId,
            onAddNewTraining: (e) => handleAddNewTraining(e),
            onSaveTraining: (training, fbId) => handleSaveTraining(training, fbId),
            onCancel: handleCancel,
            onEditTraining: (fbId) => handleEditTraining(fbId),
            onDeleteTraining: (fbId) => handleDeleteTraining(fbId),
          }}>
            <Switch>
              <Route exact path={path}>
                <h3>Выберите раздел</h3>
              </Route>
              <Route exact path={`${path}/statistics`} component={Statistics}/>

              {
                <EditingCardContext.Provider value={{ isAdding, isEditing, editingTraining }}>
                  <Route exact path={`${path}/dashboard`} component={Cards} />
                </EditingCardContext.Provider>
              }

            </Switch>
          </TrainingContext.Provider>
          }
        </div>
      </div>
    </>
  )
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.trainings.isLoading,
    trainings: state.trainings.trainings,
    authUser: state.sessionState.authUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoadingChange: (value) => dispatch(actionLoadingTrainings(value)),
  onSetTrainings: (trainings) => dispatch(actionSetTrainings(trainings)),
  onSaveTraining: (trainings) => dispatch(actionSaveTrainings(trainings)),
  onCancelTraining: () => dispatch(actionCancelTraining()),
  onDeleteTraining: (state) => dispatch(actionDeleteTraining(state)),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Trainings);
