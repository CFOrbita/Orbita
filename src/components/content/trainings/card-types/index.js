import React, {useContext} from 'react'
import {RadioButton} from "../../../shared/RadioButton";
import {CardContext} from "../../../../context";
import {CARDIO, POWER} from "../../../../utils/constants/contastns";

export const TrainingCardTypes = () => {
  const {type, onTypeChange} = useContext(CardContext);

  return (
    <div className="card__types">
      <RadioButton checked={type === POWER}
                   label="Силовая"
                   name="trainingType"
                   value={POWER}
                   onChange={(e) => onTypeChange(e.target.value)}/>
      <RadioButton checked={type === CARDIO}
                   label="Кардио"
                   name="trainingType"
                   value={CARDIO}
                   onChange={(e) => onTypeChange(e.target.value)}/>
    </div>
  )
};
