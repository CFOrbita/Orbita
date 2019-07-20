import React, {Component} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreatableSelect from 'react-select/creatable';
import Options from "../../../../training-data/optionsData";

import TrainingSession from "../training-session/training-session";

class TrainingCardEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      gym,
      startDate,
      sessions,
      onDateChange,
      onGymChange,
      onGymInputChange,
      onPartBodyChange,
      onExerciseChange,
      onInputChange,
      onTextareaChange,
      onDeleteSession,
      onAddSession
    } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <div className="card-header__info card-header__left">
              <DatePicker
                className="card__date-picker"
                selected={startDate}
                dateFormat="dd/MM/yyyy"
                onChange={onDateChange}/>

              <CreatableSelect
                className="card__select"
                value={gym.newValue}
                placeholder="Зал"
                onChange={onGymChange}
                onInputChange={onGymInputChange}
                options={Options.optionsGyms}/>
            </div>
          </div>
          {sessions.map((item, index) => {
            return (
              <TrainingSession
                key={index}
                item={item}
                onPartBodyChange={onPartBodyChange}
                onExerciseChange={onExerciseChange}
                onInputChange={onInputChange}
                onDeleteSession={onDeleteSession} />
            )
          })}
          <div className="card__add">
            <button
              className="card__add-workout"
              onClick={onAddSession}>
              Добавить
            </button>
          </div>
          <div className="card__comment">
            <textarea
              className="card-comment__textarea"
              placeholder="Для заметок"
              onChange={onTextareaChange}/>
          </div>
          <div className="card__actions">
            <button className="card__actions-save">Сохранить</button>
            <button className="card__actions-cancel">Отмена</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default TrainingCardEdit;
