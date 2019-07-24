import React, {Component} from "react";
import Select from "react-select";

class Workout extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {
      idSession,
      idWorkout,
      selectedExercise,
      sets,
      repeats,
      exercises,
      onExerciseChange,
      onDeleteExercise,
      onInputChange
    } = this.props;

    return (
      <div className="card__workout">
        <Select
          className="card__select card__select--workout"
          value={selectedExercise}
          placeholder="Упражнение"
          onChange={(e) => onExerciseChange(e, idSession, idWorkout)}
          options={exercises} />
        <input
          className="card__input"
          placeholder="Повторения"
          name="repeats"
          value={repeats}
          onChange={(e) => onInputChange(e, idSession, idWorkout)} />

        <input
          className="card__input"
          placeholder="Подходы"
          name="sets"
          value={sets}
          onChange={(e) => onInputChange(e, idSession, idWorkout)} />
        <button className="card__exercise-del" onClick={() => onDeleteExercise(idSession, idWorkout)}>D</button>
      </div>
    );
  }
}

export default Workout;
