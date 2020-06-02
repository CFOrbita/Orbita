import React, {Component, useContext} from "react";
import Select from "react-select";
import {CardContext} from "../../../../context";

export const Workout = ({ idSession, item, exercises }) => {
  const { onExerciseChange, onInputChange, onDeleteExercise } = useContext(CardContext);
  const { id: idWorkout, exercise, weight, sets, repeats } = item;

  return (
    <div className="card__workout">
      <Select
        className="card__select card__select--workout"
        value={exercise}
        placeholder="Упражнение"
        onChange={(e) => onExerciseChange(e, idSession, idWorkout)}
        options={exercises}/>
      <input
        className="card__input"
        placeholder="Вес, кг"
        name="weight"
        value={weight}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>

      <input
        className="card__input"
        placeholder="Повторения"
        name="repeats"
        value={repeats}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>

      <input
        className="card__input"
        placeholder="Подходы"
        name="sets"
        value={sets}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>
      <button className="card__exercise-del" onClick={() => onDeleteExercise(idSession, idWorkout)}/>
    </div>
  )
};
