import React, {useContext} from 'react'
import {RadioButton} from "../../../shared/RadioButton";
import {CardContext, EditingCardContext} from "../../../../context";
import {CARDIO, POWER} from "../../../../utils/constants/contastns";

export const TrainingCardTypes = () => {
  const {type, onTypeChange} = useContext(CardContext);
  const {isEditing} = useContext(EditingCardContext);

  return (
    <div className="card__types">
      <RadioButton checked={type === POWER}
                   label="Силовая"
                   name="trainingType"
                   disabled={isEditing}
                   value={POWER}
                   onChange={(e) => onTypeChange(e.target.value, 'partBody')}/>
      <RadioButton checked={type === CARDIO}
                   label="Кардио"
                   name="trainingType"
                   disabled={isEditing}
                   value={CARDIO}
                   onChange={(e) => onTypeChange(e.target.value, 'activity')}/>
    </div>
  )
};
