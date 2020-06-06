import React, {useState, useContext} from "react";
import {TrainingCardAdd} from "../add-training/add-training";
import Select from "react-select";
import Options from "../../../../training-data/optionsData";
import {TrainingContext, EditingCardContext} from "../../../../context";
import {dateSortAsc, dateSortDesc} from "../../../../utils/Helpers";
import Loading from "../../loader/loader.jsx";
import {TrainingCard} from "../training-card/training-card";


export const Cards = () => {
  const [filter, setFilter] = useState(null);
  const { isLoading, trainings, onAddNewTraining } = useContext(TrainingContext);
  const { isEditing } = useContext(EditingCardContext);

  function getFilteredTrainings() {
    const filteredTrainings = [...trainings];

    if (filter === null) return filteredTrainings;

    switch (filter.value) {
      case 'dateAsc':
        return filteredTrainings.sort(dateSortAsc);
      case 'dateDesc':
        return filteredTrainings.sort(dateSortDesc);
    }
  }

  return (
    <div className="training-workout">
      <a className="training-workout__text"
         href="#"
         onClick={onAddNewTraining}>
        Добавить тренировку
      </a>
      { isEditing && <TrainingCardAdd/> }
      { isLoading && <Loading/> }
      {
        getFilteredTrainings().length > 0
          ? <>
              <Select className="card__select"
                      value={filter}
                      placeholder="Фильтр"
                      onChange={setFilter}
                      options={Options.optionsFilterCards}/>
              <div className="training-workout__list">
                {getFilteredTrainings().map(item => (<TrainingCard key={item[0]}
                                                                   fbId={item[0]}
                                                                   item={item[1]} />)
                )}
              </div>
            </>

          : <span className="training-workout__text training-workout__text--empty">Список тренировок отсутствует</span>
      }
    </div>
  )
};

