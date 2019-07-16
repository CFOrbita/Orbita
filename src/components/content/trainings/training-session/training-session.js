import React, {Component} from "react";
import Select from "react-select";
import Workout from "../workout/workout";

const optionsPartBody = [
  {value: 'shoulders', label: 'Плечи'},
  {value: 'arms', label: 'Руки'},
  {value: 'back', label: 'Спина'},
  {value: 'chest', label: 'Грудь'},
  {value: 'legs', label: 'Ноги'}
];

const optionsExercises = {
  shoulders: [{value: '1', label: 'Ex1'}, {value: '2', label: 'Ex2'}, {value: '3', label: 'Ex3'},],
  arms: [],
  back: [],
  chest: [],
  legs: [],
};

class TrainingSession extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: {
        partBody: null
      }
    };

    this.handleBodyPartChange = this.handleBodyPartChange.bind(this);
  }

  handleBodyPartChange(selectedOption) {
    this.setState({
      session: {
        partBody: selectedOption
      }
    }, () => this.setExercises);
  };

  setExercises() {
    return null
  }

  render() {
    const {partBody} = this.state.session;

    return (
      <div className="card-content__wrapper">
        <div className="card-content">
          <Select
            className="card__select"
            value={partBody}
            placeholder="Часть тела"
            onChange={this.handleBodyPartChange}
            options={optionsPartBody} />
          {partBody && (
            <Workout exercises={optionsExercises}/>
          )}

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
