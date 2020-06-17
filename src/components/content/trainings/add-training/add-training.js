import React, {useContext, useState} from "react";
import { TrainingCardEdit } from "../training-card-edit/training-card-edit";
import cloneDeep from "lodash.clonedeep";
import { isNullOrUndefined } from "../../../../utils/Helpers";
import {TrainingContext, EditingCardContext, CardContext} from "../../../../context";
import {POWER} from "../../../../utils/constants/contastns";

export const TrainingCardAdd = () => {
  const { setNewId, onSaveTraining, onCancel } = useContext(TrainingContext);
  const { isAdding, editingTraining } = useContext(EditingCardContext);
  const training = (editingTraining && editingTraining.training) || {};
  const [errors, setErrors] = useState(null);
  const [id, setId] = useState(training.id || setNewId());
  const [type, setType] = useState(training.type || null);
  const [place, setPlace] = useState(training.place || null);
  const [date, setDate] = useState(training.date || new Date().toISOString().substr(0, 10));
  const [sessions, setSessions] = useState(training.sessions || []);
  const [note, setNote] = useState(training && training.note || '');


  function sessionFinder(id) {
    const clonedSessions = cloneDeep(sessions);
    const indexSession = clonedSessions.findIndex((session => session.id === id));
    const session = {...clonedSessions[indexSession]};

    return {session, indexSession}
  }

  function exercisesFinder(id, indexSession) {
    const exercises = cloneDeep(sessions[indexSession].exercises);
    const indexWorkout = exercises.findIndex((workout => workout.id === id));

    const workout = {...exercises[indexWorkout]};

    return {workout, indexWorkout}
  }

  function defineLastId(indexSession) {
    let iterableArr = indexSession ? [...sessions[indexSession].exercises] : [...sessions];
    let id = 0;

    iterableArr.forEach((item) => {
      if (item.id > id) {
        id = item.id
      }
    });

    return id;
  }

  function handleMainSelectChange(selectedOption, id, type) {
    let clonedSessions = cloneDeep(sessions);

    const {session, indexSession} = sessionFinder(id); //returns new copy of object
    session[type] = selectedOption;

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

    if (type === POWER) clonedSessions.push({id: newId, partBody: null, exercises: [{id: 1, exercise: null}]});
    else clonedSessions.push({id: newId, activity: null});

    setSessions(clonedSessions)
  }

  function handleType(type, select) {
     setSessions([{
      id: 1,
      [select]: null,
      exercises: [{id: 1, exercise: null}]
    }]);

    setType(type)
  }


  function handleSaveTraining() {
    const fbId = editingTraining && editingTraining.fbId;

    let training = {
      id,
      type,
      place,
      sessions,
      date,
      note
    };
    const errors = isValid();

    if (errors.length > 0) setErrors(errors);
    else onSaveTraining(training, fbId);
  }

  function isValid() {
    let errors = new Set();

    if (!date) errors.push('Дата не выбрана')

    if (type === POWER) {
      for (let i = 0; i < sessions.length; i++) {
        const {exercises} = sessions[i];

        if (sessions[i].partBody === null)  {
          errors.push('Не выбрана чать тела')
          break
        }

        for (let j = 0; j < exercises.length; j++) {
          if (isNullOrUndefined(exercises[j].exercise)) errors.add(`В сессии ${i + 1} не везде выбраны упражнения`)
          if (isNullOrUndefined(exercises[j].weight)) errors.add(`В сессии ${i + 1} не везде проставлен вес`)
          if (isNullOrUndefined(exercises[j].sets)) errors.add(`В сессии ${i + 1} не везде проставлены подходы`)
          if (isNullOrUndefined(exercises[j].repeats)) errors.add(`В сессии ${i + 1} не везде проставлены повторы`)
        }
      }
    }

    return [...errors].length;
  }

  return (
    <>
      <section className="add-workout">
        <h1 className="add-workout__title">{isAdding ? 'Добавление тренировки' : 'Редактирование'}</h1>
        <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>

        <div className="add-workout__list">
          <CardContext.Provider value={{
            errors,
            sessions,
            type,
            place,
            date,
            note,
            onTypeChange: (type, select) => handleType(type, select),
            onDateChange: (date) => setDate(date),
            onPlaceChange: (place) => setPlace(place),
            handleMainSelectChange: (selectedOption, id, type) => handleMainSelectChange(selectedOption, id, type),
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
