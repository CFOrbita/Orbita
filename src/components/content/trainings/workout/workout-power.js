import React, {useContext} from 'react'
import Select from "react-select";
import {CardContext} from "../../../../context";

export const WorkoutPower = ({ idSession, item, exercises }) => {
  const { onExerciseChange, onInputChange, onDeleteExercise } = useContext(CardContext);
  const { id: idWorkout, exercise, weight, sets, repeats } = item;
  return (
    <>
      <Select
        className="card__select card__select--workout"
        value={exercise}
        placeholder="Упражнение"
        onChange={(e) => onExerciseChange(e, idSession, idWorkout)}
        options={exercises}/>
      <input
        className="card__input card__input--weight"
        placeholder="Вес, кг"
        name="weight"
        value={weight}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>

      <input
        className="card__input card__input--repeats"
        placeholder="Повторения"
        name="repeats"
        value={repeats}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>

      <input
        className="card__input card__input--sets"
        placeholder="Подходы"
        name="sets"
        value={sets}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>
      <button className="card__exercise-del"
              onClick={() => onDeleteExercise(idSession, idWorkout)}/></>
  )
}
