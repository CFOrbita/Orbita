import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Statistics from "./statistics/statistics.jsx";
import { Cards } from "./cards/cards.jsx";
import {connect} from "react-redux";
import cloneDeep from "lodash.clonedeep";
import {TrainingContext, EditingCardContext} from '../../../context'
import {
  actionCancelTraining,
  actionDeleteTraining,
  actionSaveTraining,
  actionSetTrainings
} from "../../../reducer/trainings/trainingsData";
import {compose} from "recompose";
import {withFirebase} from "../../Firebase";
import withAuthorization from "../../hoc/with-authorization/with-authorization.jsx";


const Trainings = ({trainings, authUser, match, firebase, onSetTrainings, onCancelTraining, onSaveTraining, onDeleteTraining}) => {
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const {url, path} = match;

  useEffect(getTrainings, []);

  function getTrainings() {
    setLoading(true);

    firebase
      .trainings(authUser.uid)
      .once('value', snapshot => {
        let trainings = [];
        let values = snapshot.val();
        if (!!values) {
          trainings = Object.entries(values);
        }

        onSetTrainings(trainings);

        setLoading(false);
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
    setEditing(prevState => !prevState)
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
      (error) => {
        if (error) console.error(error)
      }
    )
  }

  function deleteOnFirebase(authUser, key) {
    firebase.training(authUser.uid, key).remove()
  }

  function handleSaveTraining(training, fbId) {
    setLoading(true);

    const clonedTrainings = cloneDeep(trainings);
    const indexTraining = clonedTrainings.findIndex((item => item[0] === fbId));

    if (indexTraining === -1) {
      const fbId = firebase.trainings(authUser.uid).push().key;
      clonedTrainings.push([fbId, {training}]);

      saveOnFirebase(authUser, training, fbId).then(() => setLoading(false));
    } else {
      clonedTrainings[indexTraining][1].training = training;

      saveOnFirebase(authUser, training, fbId).then(() => setLoading(false));
    }

    onSaveTraining(clonedTrainings);

    setEditingTraining(null);
    setEditing(prevState => !prevState)
  }

  function handleDeleteTraining(fbId) {
    const training = trainings.filter(item => item[0] !== fbId);

    deleteOnFirebase(authUser, fbId);
    onDeleteTraining(training);
  }

  function handleEditTraining(fbId) {
    const forEdit = trainings.filter(item => item[0] === fbId)[0];
    setEditingTraining({fbId, training: forEdit[1].training});

    setEditing(prevState => !prevState)
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
            loading,
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
                <EditingCardContext.Provider value={{ isEditing, editingTraining }}>
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
    trainings: state.trainings,
    authUser: state.sessionState.authUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSetTrainings: (item) => dispatch(actionSetTrainings(item)),
  onSaveTraining: (item) => dispatch(actionSaveTraining(item)),
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
