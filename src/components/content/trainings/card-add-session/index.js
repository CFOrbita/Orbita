import React, {useContext} from 'react'
import {CardContext} from "../../../../context";

export const TrainingCardAddSession = () => {
  const {type, onAddSession} = useContext(CardContext);

  return (
    <>
      {type && (
        <div className="card__add">
          <button className="card__add-btn card__add-btn--session" onClick={onAddSession}>
            Добавить
          </button>
        </div>)
      }
    </>
  )
};
