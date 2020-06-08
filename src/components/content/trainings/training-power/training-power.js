import React, {useContext} from "react";
import Select from "react-select";
import {Workout} from "../workout/workout";
import Options from "../../../../training-data/optionsData";
import {CardContext} from "../../../../context";

export const TrainingPower = ({ item }) => {
  const { onPartBodyChange, onDeleteSession, onAddWorkout } = useContext(CardContext);
  const { id, partBody, exercises } = item;

  function setExercises(part) {
    switch (part) {
      case 'shoulders':
        return Options.optionsExercises.shoulders;
      case 'arms':
        return Options.optionsExercises.arms;
      case 'back':
        return Options.optionsExercises.back;
      case 'chest':
        return Options.optionsExercises.chest;
      case 'press':
        return Options.optionsExercises.press;
      case 'legs':
        return Options.optionsExercises.legs;
      default:
        return null
    }
  }


  let optionExercises = null;

  if (partBody !== null) {
    optionExercises = setExercises(partBody.value);
  }

  return (
    <>
        <Select
          className="card__select"
          value={partBody}
          placeholder="Часть тела"
          onChange={(e) => onPartBodyChange(e, id)}
          options={Options.optionsPartBody}/>

        {partBody &&
          <>
            {exercises.map((item, index) => (<Workout key={index}
                                                      idSession={id}
                                                      item={item}
                                                      exercises={optionExercises} />)
            )}

            <button className="card__add-btn card__add-btn--workout"
                    onClick={() => onAddWorkout(id)}>
              Ещё
            </button>
          </>
        }

        <button className="card__btn-delete" onClick={() => onDeleteSession(id)}/>
      </>
  )
};
