import React, {useContext} from "react";
import {CardContext} from "../../../../context";
import {CARDIO, POWER} from "../../../../utils/constants/contastns";
import {WorkoutPower} from "./workout-power";
import {WorkoutCardio} from "./workout-cardio";

export const Workout = ({ idSession, item, exercises }) => {
  const { type } = useContext(CardContext);

  return (
    <div className="card__workout">
      {type === POWER && <WorkoutPower exercises={exercises} idSession={idSession} item={item}/>}
      {type === CARDIO && <WorkoutCardio exercises={exercises} idSession={idSession} item={item}/>}
    </div>
  )
};
