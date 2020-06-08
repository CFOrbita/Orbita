import React, {useContext} from 'react'
import Select from "react-select";
import Options from "../../../../training-data/optionsData";
import {CardContext} from "../../../../context";

export const TrainingCardio = ({ item }) => {
  const {onCardioActivityChange} = useContext(CardContext);
  const { id, activity } = item;

  return (
    <>
        <Select
          className="card__select"
          value={activity}
          placeholder="Активность"
          onChange={(e) => {
            onCardioActivityChange(e, id)
          }}
          options={Options.optionsCardioActivities}/>
    </>
  )
};
