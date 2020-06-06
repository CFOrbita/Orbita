import React, {useContext} from "react";
import CreatableSelect from 'react-select/creatable';
import Options from "../../../../training-data/optionsData";
import {TrainingSession} from "../training-session/training-session";
import {CardContext} from "../../../../context";

export const TrainingCardEdit = () => {
  const {
    errors,
    date,
    sessions,
    note,
    gym,
    onDateChange,
    onGymChange,
    onGymInputChange,
    onAddSession,
    onTextareaChange,
    onSaveTraining,
    onCancel,
  } = useContext(CardContext);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-header__info card-header__left">
            <input type="date"
                   className="card__date-picker"
                   value={date}
                   onChange={(e) => onDateChange(e.target.value)}
            />

            <CreatableSelect
              className="card__select"
              value={gym.name}
              placeholder="Зал"
              onChange={onGymChange}
              onInputChange={onGymInputChange}
              options={Options.optionsGyms}/>
          </div>
        </div>

        {errors && <div className="card__errors">{errors.map((error, index) => <span key={index} className="card__errors-text">{ error }</span> )}</div>}

        {sessions.map((item, index) => <TrainingSession key={index} item={item} />)}

        <div className="card__add">
          <button className="card__add-btn card__add-btn--session" onClick={onAddSession}>
            Добавить
          </button>
        </div>
        <div className="card__comment">
            <textarea
              className="card-comment__textarea"
              value={note}
              placeholder="Для заметок"
              onChange={onTextareaChange}/>
        </div>
        <div className="card__actions">
          <button className="card__actions-save" onClick={onSaveTraining}>Сохранить</button>
          <button className="card__actions-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </>
  )
};
