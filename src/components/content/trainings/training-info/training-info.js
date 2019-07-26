import React from "react";

const TrainingInfo = (props) => {
  const {partBody, exercises} = props.item;

  return (
    <React.Fragment>
      <div className="card-content__info">
        <h4 className="card-content__title">{partBody.label}</h4>
      </div>
      {exercises.map((item, index) => {
        const repeats = item.repeats ? item.repeats : '0';
        const sets = item.sets ? item.sets : '0';

        return (
          <div key={index} className="card-content__info">
            <div className="card-content__exercise">
              <span className="card-content__list-item">{item.exercise.label}</span>
            </div>
            <div className="card-content__list">
              <span className="card-content__list-item">Повторы: {repeats}</span>
              <span className="card-content__list-item">Подходы: {sets}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default TrainingInfo;
