import React, {useContext} from 'react'
import {CARDIO, POWER} from "../../../../utils/constants/contastns";
import {TrainingPower} from "../training-power/training-power";
import {TrainingCardio} from "../training-cardio/training-cardio";
import {CardContext} from "../../../../context";

export const TrainingCardContent = () => {
  const {type, sessions} = useContext(CardContext);

  return (
    <div className="card-content__wrapper">
      <div className="card-content">
        {type === POWER && sessions.map((item, index) => <TrainingPower key={index} item={item} />)}
        {type === CARDIO && sessions.map((item, index) => <TrainingCardio key={index} item={item} />)}
      </div>
    </div>
  )
};
