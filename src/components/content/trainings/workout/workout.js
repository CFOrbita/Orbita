import React, {Component} from "react";
import Select from "react-select";

class Workout extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {selectedExercise, exercises, onExerciseChange} = this.props;

    return (
      <React.Fragment>
        <Select
          className="card__select"
          value={selectedExercise}
          placeholder="Упражнение"
          onChange={onExerciseChange}
          options={exercises}/>
      </React.Fragment>
    );
  }
}

export default Workout;
