import React, {Component} from "react";
import Select from "react-select";
import Workout from "../workout/workout";
import Options from "../../../../training-data/optionsData";

class TrainingSession extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.setExercises = this.setExercises.bind(this);
  }

  setExercises(part) {
    switch (part.value) {
      case 'shoulders':
        return Options.optionsExercises.shoulders;
      case 'arms':
        return Options.optionsExercises.arms;
      case 'back':
        return Options.optionsExercises.back;
      case 'chest':
        return Options.optionsExercises.chest;
      case 'legs':
        return Options.optionsExercises.legs;
      default:
        return null
    }
  }

  render() {
    const {
      item,
      onPartBodyChange,
      onExerciseChange,
      onInputChange,
      onDeleteSession,
      onAddWorkout
    } = this.props;

    const {id, partBody, exercises} = item;

    let optionExercises = null;

    if (partBody !== null) {
      optionExercises = this.setExercises(partBody);
    }

    return (
      <div className="card-content__wrapper">
        <div className="card-content">
          <Select
            className="card__select"
            value={partBody}
            placeholder="Часть тела"
            onChange={(e) => onPartBodyChange(e, id)}
            options={Options.optionsPartBody}/>

          {partBody &&
            <React.Fragment>
              {exercises.map((item, index) => {
                return (
                  <Workout
                    key={index}
                    idSession={id}
                    idWorkout={item.id}
                    selectedExercise={item.exercise}
                    sets={item.sets}
                    repeats={item.repeats}
                    exercises={optionExercises}
                    onExerciseChange={onExerciseChange}
                    onInputChange={onInputChange}/>
                )
              })}

              <button
                className="card__add-btn card__add-btn--workout"
                onClick={() => onAddWorkout(id)}>
                Ещё
              </button>
            </React.Fragment>
          }

          <button
            className="card__btn-delete"
            onClick={() => onDeleteSession(id)}
          />
        </div>
      </div>
    );
  }
}

export default TrainingSession;
