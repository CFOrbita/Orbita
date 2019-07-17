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
      onSetsChange,
      onRepeatsChange
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
                partBody={item.partBody}
                exercise={item.exercise}
                onPartBodyChange={onPartBodyChange}
                onExerciseChange={onExerciseChange}
                onSetsChange={onSetsChange}
                onRepeatsChange={onRepeatsChange}/>
            )
          })}

        </div>
      </React.Fragment>
    )
  }
}

export default TrainingCardEdit;
