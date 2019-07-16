import React, {Component} from "react";
import Select from "react-select";
import Workout from "../workout/workout";
import Options from "../../../../training-data/optionsData";

class TrainingSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: {
        partBody: null,
        exercise: null,
      }
    };

    this.handleBodyPartChange = this.handleBodyPartChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.setExercises = this.setExercises.bind(this);
  }

  handleBodyPartChange(selectedOption) {
    this.setState({
      session: {
        partBody: selectedOption,
        exercise: null
      }
    }, () => this.setExercises);
  };

  handleExerciseChange(selectedOption) {
    this.setState({
      session: {
        ...this.state.session,
        exercise: selectedOption
      }
    });
  };

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
    const {partBody, exercise} = this.state.session;
    let exercises = null;

    if(partBody !== null) {
      exercises = this.setExercises(partBody);
    }

    return (
      <div className="card-content__wrapper">
        <div className="card-content">
          <Select
            className="card__select"
            value={partBody}
            placeholder="Часть тела"
            onChange={this.handleBodyPartChange}
            options={Options.optionsPartBody} />

          {partBody &&
            <React.Fragment>
              <Workout
                selectedExercise={exercise}
                exercises={exercises}
                onExerciseChange={this.handleExerciseChange}
              />
            </React.Fragment>
          }

          {/*<div className="card-content__workout">*/}
            {/*<div className="input-wrapper">*/}
              {/*<input className="card-content__workout-item card-content--input" type="number" placeholder="0"*/}
                     {/*id="reps"/>*/}
              {/*<span>x</span>*/}
              {/*<input className="card-content__workout-item card-content--input input-sets" type="number"*/}
                     {/*placeholder="0" id="sets"/>*/}
            {/*</div>*/}
          {/*</div>*/}

          {/*<select className="card-content__workout-item card-select">*/}
            {/*<option selected disabled>Упражнение</option>*/}
            {/*<option className="card-select__item">Подтягивания</option>*/}
            {/*<option className="card-select__item">Cтановая тяга</option>*/}
          {/*</select>*/}
          {/*<select className="card-content__workout-item card-select">*/}
            {/*<option selected disabled>Снаряд</option>*/}
            {/*<option className="card-select__item">штанга</option>*/}
            {/*<option className="card-select__item">медбол</option>*/}
            {/*<option className="card-select__item">гиря</option>*/}
            {/*<option className="card-select__item">гантель</option>*/}
            {/*<option className="card-select__item">диск</option>*/}
            {/*<option className="card-select__item">сендбэг</option>*/}
          {/*</select>*/}
          {/*<div className="input-wrapper">*/}
            {/*<input className="card-content__workout-item card-content--input minutes" type="number"*/}
                   {/*placeholder="0" id="minutes"/>*/}
            {/*<label className="card-label" htmlFor="minutes">мин.</label>*/}
          {/*</div>*/}
          {/*<div className="card-content__workout-item delete"><i className="fas fa-trash-alt"></i></div>*/}
        </div>
        <div className="card-content card-comment">
          <textarea className="card-comment__textarea" placeholder="Для заметок"></textarea>
        </div>
      </div>
    );
  }
}

export default TrainingSession;
