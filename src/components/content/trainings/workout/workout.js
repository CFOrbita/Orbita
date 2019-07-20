import React, {Component} from "react";
import Select from "react-select";

class Workout extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      id,
      selectedExercise,
      sets,
      repeats,
      exercises,
      onExerciseChange,
      onInputChange
    } = this.props;

    return (
      <div className="card__workout">
        <Select
          className="card__select card__select--workout"
          value={selectedExercise}
          placeholder="Упражнение"
          onChange={(e) => onExerciseChange(e, id)}
          options={exercises} />
        <input
          className="card__input"
          placeholder="Повторения"
          name="repeats"
          value={repeats}
          onChange={(e) => onInputChange(e, id)} />

        <input
          className="card__input"
          placeholder="Подходы"
          name="sets"
          value={sets}
          onChange={(e) => onInputChange(e, id)} />
      </div>
    );
  }
}

export default Workout;
