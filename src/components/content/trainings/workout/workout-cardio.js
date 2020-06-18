import React, {useContext} from 'react'
import {CardContext} from "../../../../context";

export const WorkoutCardio = ({ idSession, item }) => {
  const {onInputChange, onDeleteExercise} = useContext(CardContext);
  const {id: idWorkout, distance, time} = item;
  return (
    <>
      <input
        className="card__input card__input--weight"
        placeholder="Дистанция, м"
        name="distance"
        value={distance}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>

      <input
        className="card__input card__input--repeats"
        placeholder="Время"
        type="time"
        step={10}
        name="time"
        value={time}
        onChange={(e) => onInputChange(e, idSession, idWorkout)}/>

      <button className="card__exercise-del"
              onClick={() => onDeleteExercise(idSession, idWorkout)}/>
    </>
  )
}
