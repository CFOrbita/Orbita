import React, {Component} from "react";
import TrainingCard from "../training-card/training-card";
import TrainingCardAdd from "../add-training/add-training";
import Select from "react-select";
import Options from "../../../../training-data/optionsData";
import {dateSortAsc, dateSortDesc} from "../../../../utils/Helpers";

class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(filter) {
    this.setState({filter})
  }

  getFilteredTrainings() {
    const {filter} = this.state;
    const trainings = [...this.props.trainings];

    if (filter === null) return trainings;

    switch (filter.value) {
      case 'dateAsc':
        return trainings.sort(dateSortAsc);
      case 'dateDesc':
        return trainings.sort(dateSortDesc);
    }
  }

  render() {
    const {
      isEditing,
      setNewId,
      editingTraining,
      onAddNewTraining,
      onSaveTraining,
      onCancel,
      onEditTraining,
      onDeleteTraining,
    } = this.props;
    const {filter} = this.state;
    const trainings = this.getFilteredTrainings();

    return (
      <div className="training-workout">
        <a className="training-workout__text" href="#" onClick={onAddNewTraining}>
          Добавить тренировку
        </a>
        {
          isEditing &&
          (
            <TrainingCardAdd
              setNewId={setNewId}
              editingTraining={editingTraining}
              onSaveTraining={onSaveTraining}
              onCancel={onCancel}/>
          )
        }

        {
          trainings.length > 0 &&
          (
            <React.Fragment>
              <Select
                className="card__select"
                value={filter}
                placeholder="Фильтр"
                onChange={this.onFilterChange}
                options={Options.optionsFilterCards}
              />
              <div className="training-workout__list">
                {trainings.map((item, index) => {
                  return <TrainingCard
                    key={index}
                    item={item}
                    onEditTraining={onEditTraining}
                    onDeleteTraining={onDeleteTraining}/>
                })}
              </div>
            </React.Fragment>
          )
        }

        {
          trainings.length === 0 && <span className="training-workout__text training-workout__text--empty">Список тренировок отсутствует</span>
        }
      </div>
    );
  }
}

export default Cards;
