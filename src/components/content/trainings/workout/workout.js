import React, {Component} from "react";
import Select from "react-select";

class Workout extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      selectedExercise,
      exercises,
      onExerciseChange,
      onSetsChange,
      onRepeatsChange
    } = this.props;

    return (
      <div className="card__workout">
        <Select
          className="card__select card__select--workout"
          value={selectedExercise}
          placeholder="Упражнение"
          onChange={onExerciseChange}
          options={exercises} />
        <input
          className="card__input"
          placeholder="Повторения"
          onChange={onRepeatsChange} />

        <input
          className="card__input"
          placeholder="Повторы"
          onChange={onSetsChange} />
      </div>
    );
  }
}

export default Workout;
