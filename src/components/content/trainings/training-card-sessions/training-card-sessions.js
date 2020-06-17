import React, {useContext} from "react";
import Select from "react-select";
import {Workout} from "../workout/workout";
import Options from "../../../../training-data/optionsData";
import {CardContext} from "../../../../context";
import {POWER} from "../../../../utils/constants/contastns";

export const TrainingCardSessions = ({ item }) => {
  const { type, handleMainSelectChange, onDeleteSession, onAddWorkout } = useContext(CardContext);
  const { id, partBody,activity, exercises } = item;
  let optionExercises = partBody ? setExercises(partBody.value) : null;
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

  function renderMainSelect(type) {
    const isPowerType = type === POWER;
    return (
      <Select
        className="card__select"
        value={isPowerType ? partBody : activity}
        placeholder={isPowerType ? "Часть тела" : "Активность"}
        onChange={(e) => handleMainSelectChange(e, id, isPowerType ? 'partBody' : 'activity')}
        options={isPowerType ? Options.optionsPartBody : Options.optionsCardioActivities}/>
    )
  }

  return (
    <>
      {renderMainSelect(type)}

      {(partBody || activity) &&
        <>
          {exercises.map((item, index) => (<Workout key={index}
                                                    idSession={id}
                                                    item={item}
                                                    exercises={optionExercises}/>)
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
