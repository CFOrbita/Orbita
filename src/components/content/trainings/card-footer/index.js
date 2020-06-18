import React, {useContext} from 'react'
import {CardContext} from "../../../../context";

export const TrainingCardFooter = () => {
  const {onSaveTraining, onCancel} = useContext(CardContext);
  return (
    <div className="card__actions">
      <button className="card__actions-save" onClick={onSaveTraining}>Сохранить</button>
      <button className="card__actions-cancel" onClick={onCancel}>Отмена</button>
    </div>

  )
};
