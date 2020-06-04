import React, {useContext, useState} from "react";
import { TrainingCardEdit } from "../training-card-edit/training-card-edit";
import cloneDeep from "lodash.clonedeep";
import {getDateByTimestamp} from "../../../../utils/Helpers";
import {TrainingContext, EditingCardContext, CardContext} from "../../../../context";

export const TrainingCardAdd = () => {
  const { setNewId, onSaveTraining, onCancel } = useContext(TrainingContext);
  const { editingTraining } = useContext(EditingCardContext);
  const training = (editingTraining && editingTraining.training) || {};
  const [error, setError] = useState(null);
  const [id, setId] = useState(training.id || setNewId());
  const [gym, setGym] = useState(training.gym || {name: null, inputValue: null});
  const [date, setDate] = useState(training.date && getDateByTimestamp(training.date) || new Date());
  const [sessions, setSessions] = useState(training.sessions || [{
      id: 1,
      partBody: null,
      exercises: [{id: 1, exercise: null}]
    }]);
  const [note, setNote] = useState(training && training.note || '');


  function sessionFinder(id) {
    const clonedSessions = cloneDeep(sessions);
    const indexSession = clonedSessions.findIndex((session => session.id === id));
    let session = {...clonedSessions[indexSession]};

    return {session, indexSession}
  }

  function exercisesFinder(id, indexSession) {
    const exercises = cloneDeep(sessions[indexSession].exercises);
    const indexWorkout = exercises.findIndex((workout => workout.id === id));

    let workout = {...exercises[indexWorkout]};

    return {workout, indexWorkout}
  }

  function defineLastId(indexSession) {
    let iterableArr = indexSession !== undefined
      ? [...sessions[indexSession].exercises]
      : [...sessions];
    let id = 0;

    iterableArr.forEach((item) => {
      if (item.id > id) {
        id = item.id
      }
    });

    return id;
  }

  function handleGymChange(name) {
    setGym(prevState => ({
      ...prevState,
      name
    }))
  }

  function handleGymInputChange(inputValue) {
    setGym(prevState => ({
      ...prevState,
      inputValue
    }))
  }

  function handleBodyPartChange(selectedOption, id) {
    let clonedSessions = cloneDeep(sessions);

    const {session, indexSession} = sessionFinder(id); //returns new copy of object
    session.partBody = selectedOption;

    if (session.exercises.length === 1) {
      session.exercises[0].exercise = null;
    } else {
      session.exercises.length = 0;
      session.exercises.push({id: 1, exercise: null});
    }

    clonedSessions[indexSession] = session;

    setSessions(clonedSessions);
  }

  function handleExerciseChange(selectedOption, idSession, idWorkout) {
    let clonedSessions = cloneDeep(sessions);

    const {session, indexSession} = sessionFinder(idSession); //returns new copy of object
    const {workout, indexWorkout} = exercisesFinder(idWorkout, indexSession); //returns new copy of object

    workout.exercise = selectedOption;
    clonedSessions[indexSession].exercises[indexWorkout] = workout;

    setSessions(clonedSessions);
  }

  function handleInputChange(event, idSession, idWorkout) {
    const value = event.target.value;
    const name = event.target.name;

    let clonedSessions = cloneDeep(sessions);
    const {session, indexSession} = sessionFinder(idSession); //returns new copy of object
    const {workout, indexWorkout} = exercisesFinder(idWorkout, indexSession); //returns new copy of object

    workout[name] = value;
    clonedSessions[indexSession].exercises[indexWorkout] = workout;

    setSessions(clonedSessions);
  }

  function handleDeleteSession(id) {
    let filteredSessions = [...sessions].filter(item => item.id !== id);
    if (filteredSessions.length === 1) return;

    setSessions(filteredSessions)
  }

  function handleDeleteExercise(idSession, idWorkout) {
    let clonedSessions = cloneDeep(sessions);

    const {session, indexSession} = sessionFinder(idSession); //returns new copy of object

    if (clonedSessions[indexSession].exercises.length === 1) return;
    else {
      clonedSessions[indexSession].exercises = clonedSessions[indexSession].exercises.filter(item => item.id !== idWorkout);

      setSessions(clonedSessions)
    }
  }

  function handleAddWorkout(idSession) {
    let clonedSessions = cloneDeep(sessions);
    const {session, indexSession} = sessionFinder(idSession); //returns new copy of object
    const newId = defineLastId(indexSession) + 1;

    clonedSessions[indexSession].exercises.push({id: newId, exercise: null});

    setSessions(clonedSessions)
  }

  function handleAddSession() {
    const clonedSessions = cloneDeep(sessions);
    const newId = defineLastId() + 1;

    clonedSessions.push({id: newId, partBody: null, exercises: [{id: 1, exercise: null}]});

    setSessions(clonedSessions)
  }

  function handleSaveTraining() {
    const fbId = editingTraining && editingTraining.fbId;

    let training = {
      id,
      gym,
      sessions,
      date: date.getTime(),
      note
    };
    const error = isValid();

    if (error) setError(error);
    else onSaveTraining(training, fbId);
  }

  function isValid() {
    let error = false;

    for (let i = 0; i < sessions.length; i++) {
      const {exercises} = sessions[i];

      if (sessions[i].partBody === null) {
        error = true;
        return error;
      }

      for (let j = 0; j < exercises.length; j++) {
        if (exercises[j].exercise === null ||
          exercises[j].weight === undefined ||
          exercises[j].sets === undefined ||
          exercises[j].repeats === undefined) {
          error = true;
          return error;
        }
      }
    }

    return error;
  }

  return (
    <>
      <section className="add-workout">
        <h1 className="add-workout__title">Редактирование</h1>
        <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>

        <div className="add-workout__list">
          <CardContext.Provider value={{
            error,
            sessions,
            gym,
            date,
            note,
            onDateChange: (date) => setDate(date),
            onGymChange: (name) => handleGymChange(name),
            onGymInputChange: (inputValue) => handleGymInputChange(inputValue),
            onPartBodyChange: (selectedOption, id) => handleBodyPartChange(selectedOption, id),
            onExerciseChange: (selectedOption, idSession, idWorkout) => handleExerciseChange(selectedOption, idSession, idWorkout),
            onInputChange: (event, idSession, idWorkout) => handleInputChange(event, idSession, idWorkout),
            onTextareaChange: (event) => setNote(event.target.value),
            onDeleteSession: (id) => handleDeleteSession(id),
            onDeleteExercise: (idSession, idWorkout) => handleDeleteExercise(idSession, idWorkout),
            onAddSession: handleAddSession,
            onSaveTraining: handleSaveTraining,
            onAddWorkout: (idSession) => handleAddWorkout(idSession),
            onCancel,
          }}>
            <TrainingCardEdit/>
          </CardContext.Provider>

        </div>

      </section>
    </>
  )
};
