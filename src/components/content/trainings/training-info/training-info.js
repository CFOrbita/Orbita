import React from "react";
import {POWER} from "../../../../utils/constants/contastns";

const TrainingInfo = ({ item, type }) => {
  const {
    partBody,
    activity,
    exercises
  } = item;

  return (
    <>
      <div className="card-content__info">
        <h4 className="card-content__title">{type === POWER ? partBody.label : activity.label}</h4>
      </div>
      {exercises && exercises.map((exercise, index) => {
        const { repeats, sets, weight, distance, time } = exercise;

        return (
          <div key={index} className="card-content__info">
            <div className="card-content__exercise">
              <span className="card-content__list-item">{item.exercise && item.exercise.label}</span>
            </div>
            <div className="card-content__list">
              {
                type === POWER
                  ? <>
                    <span className="card-content__list-item">{weight || '0'} кг</span>
                    <span className="card-content__list-item">Повторы: {repeats || '0'}</span>
                    <span className="card-content__list-item">Подходы: {sets || '0'}</span>
                  </>
                  : <>
                    <span className="card-content__list-item">{distance || '0'} км</span>
                    <span className="card-content__list-item">Время: {time || '0:00'}</span>
                  </>
              }
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TrainingInfo;
