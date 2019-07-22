import React from "react";

const TrainingInfo = (props) => {
  const {partBody, exercise, sets, repeats} = props.item;

  return (
    <React.Fragment>
      <div className="card-content__info">
        <h4 className="card-content__title">Часть тела</h4>
        <span>{partBody.label}</span>
      </div>
      <ul className="card-content__list">
        <li className="card-content__list-item">Упражнение</li>
      </ul>
    </React.Fragment>
  );
};

export default TrainingInfo;
