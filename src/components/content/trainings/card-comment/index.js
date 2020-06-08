import React, {useContext} from 'react'
import {CardContext} from "../../../../context";

export const TrainingCardComment = () => {
  const {type, note, onTextareaChange} = useContext(CardContext);
  return (
    <>
      {
        type && (
          <div className="card__comment">
            <textarea
              className="card-comment__textarea"
              value={note}
              placeholder="Для заметок"
              onChange={onTextareaChange}/>
          </div>
        )
      }
    </>
  )
};
