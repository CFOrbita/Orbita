import React, {Component} from "react";
import TrainingCard from "./training-card/training-card";
import TrainingCardAdd from "./add-training/add-training";

class Trainings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.editingTraining = null;

    this.handleAddNewTraining = this.handleAddNewTraining.bind(this);
    this.handleSaveTraining = this.handleSaveTraining.bind(this);
    this.handleDeleteTraining = this.handleDeleteTraining.bind(this);
    this.handleEditTraining = this.handleEditTraining.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.setNewId = this.setNewId.bind(this);
  }

  setNewId() {
    const trainings = [...this.props.trainings];
    let id = 0;

    if (trainings.length === 0) {
      return 1;
    } else {
      trainings.forEach((item) => {
        if (item.id > id) {
          id = item.id
        }
      });

      return id + 1;
    }
  }

  handleAddNewTraining(e) {
    const {isEditing} = this.state;
    if (isEditing) {
      e.preventDefault();
      return;
    }

    this.setState(prev => {
      return {isEditing: !prev.isEditing}
    })
  }

  handleCancel() {
    this.setState(prev => {
      this.editingTraining = null;

      return {isEditing: !prev.isEditing}
    })
  }

  handleSaveTraining(training) {
    const trainings = [...this.props.trainings];
    const indexTraining = trainings.findIndex((item => item.id === training.id));

    if(indexTraining === -1) {
      trainings.push(training)
    } else {
      trainings[indexTraining] = training;
    }

    this.props.onSaveTraining(trainings);

    this.setState(prev => {
      this.editingTraining = null;

      return {isEditing: !prev.isEditing}
    })
  }

  handleDeleteTraining(id) {
    const trainings = [...this.props.trainings];
    const state = trainings.filter(item => item.id !== id);

    this.props.onDeleteTraining(state);
  }

  handleEditTraining(id) {
    const trainings = [...this.props.trainings];
    this.editingTraining = trainings.filter(item => item.id === id)[0];

    this.setState(prev => {
      return {isEditing: !prev.isEditing}
    })
  }

  render() {
    const {trainings} = this.props;
    const {isEditing} = this.state;

    return (
      <React.Fragment>
        <div className="training">
          <ul className="training-points">
            <li className="training-points__item"><a className="training-points__link" href="#">Журнал</a></li>
            <li className="training-points__item"><a className="training-points__link" href="#">Статистика</a></li>
            <li className="training-points__item"><a className="training-points__link" href="#">Тестирование</a></li>
          </ul>
          <div className="training-workout">
            <a className="training-workout__text" href="#" onClick={this.handleAddNewTraining}>
              Добавить тренировку
            </a>
            {isEditing &&
              (
                <TrainingCardAdd
                  id={this.setNewId}
                  editingTraining={this.editingTraining}
                  onSaveTraining={this.handleSaveTraining}
                  onCancel={this.handleCancel}/>
              )
            }


            {trainings.length > 0 ?
              <div className="training-workout__list">
                {trainings.map((item, index) => {
                  return <TrainingCard
                    key={index}
                    item={item}
                    onEditTraining={this.handleEditTraining}
                    onDeleteTraining={this.handleDeleteTraining}/>
                })}
              </div>
              : <span
                className="training-workout__text training-workout__text--empty">Список тренировок отсутствует</span>
            }

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Trainings;
