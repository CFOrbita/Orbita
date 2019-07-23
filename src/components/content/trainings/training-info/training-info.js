import React from "react";

const TrainingInfo = (props) => {
  const {partBody, exercises} = props.item;

  return (
    <React.Fragment>
      <div className="card-content__info">
        <h4 className="card-content__title">Часть тела</h4>
        <span className="card-content__text">{partBody.label}</span>
      </div>
      {exercises.map((item, index) => {
        return (
          <div key={index} className="card-content__info">
            <div className="card-content__exercise">
              <h4 className="card-content__title">Упражнение</h4>
              <span className="card-content__list-item">{item.exercise.label}</span>
            </div>
            <div className="card-content__list">
              <span className="card-content__list-item">Повторы: {item.repeats}</span>
              <span className="card-content__list-item">Подходы: {item.sets}</span>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default TrainingInfo;
