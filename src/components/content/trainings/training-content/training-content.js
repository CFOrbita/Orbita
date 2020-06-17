import React, {useContext} from 'react'
import {TrainingCardSessions} from "../training-card-sessions/training-card-sessions";
import {CardContext} from "../../../../context";

export const TrainingCardContent = () => {
  const {sessions} = useContext(CardContext);

  return (
    <div className="card-content__wrapper">
      <div className="card-content">
        {sessions.map((item, index) => <TrainingCardSessions key={index} item={item} />)}
      </div>
    </div>
  )
};
