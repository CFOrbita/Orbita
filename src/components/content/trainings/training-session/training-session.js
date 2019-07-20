import React, {PureComponent} from "react";
import Select from "react-select";
import Workout from "../workout/workout";
import Options from "../../../../training-data/optionsData";

class TrainingSession extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };

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
      onDeleteSession
    } = this.props;

    const {id, partBody, exercise, sets, repeats} = item;

    let exercises = null;

    if (partBody !== null) {
      exercises = this.setExercises(partBody);
    }

    return (
      <div className="card-content__wrapper">
        <div className="card-content">
          <Select
            className="card__select"
            value={partBody}
            placeholder="Часть тела"
            onChange={(e) => onPartBodyChange(e, id)}
            options={Options.optionsPartBody} />

          {partBody &&
            <React.Fragment>
              <Workout
                id={id}
                selectedExercise={exercise}
                sets={sets}
                repeats={repeats}
                exercises={exercises}
                onExerciseChange={onExerciseChange}
                onInputChange={onInputChange}
              />
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
