import React, {useContext} from 'react'
import {CardContext} from "../../../../context";

export const TrainingCardErrors = () => {
  const {errors} = useContext(CardContext);

  return (
    <>
      {errors && (
        <div className="card__errors">
          {errors.map((error, index) => <span key={index} className="card__errors-text">{error}</span>)}
        </div>
      )
      }
    </>
  )
};
