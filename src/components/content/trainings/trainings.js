import React, {Component} from "react";
import TrainingCard from "./training-card/training-card";
import TrainingCardAdd from "./add-training/add-training";

class Trainings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddNew: false
    };

    this.handleAddNewTraining = this.handleAddNewTraining.bind(this);
    this.handleSaveTraining = this.handleSaveTraining.bind(this);
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
    const {isAddNew} = this.state;
    if (isAddNew) {
      e.preventDefault();
      return;
    }

    this.setState(prev => {
      return {isAddNew: !prev.isAddNew}
    })
  }

  handleCancel() {
    this.setState(prev => {
      return {isAddNew: !prev.isAddNew}
    })
  }

  handleSaveTraining(training) {
    this.props.onSaveTrainings(training);

    this.setState(prev => {
      return {isAddNew: !prev.isAddNew}
    })
  }

  render() {
    const {trainings} = this.props;
    const {isAddNew} = this.state;

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
            {isAddNew && <TrainingCardAdd id={this.setNewId} onSaveTrainings={this.handleSaveTraining} onCancel={this.handleCancel}/>}


            {trainings.length > 0 ?
              <div className="training-workout__list">
                {trainings.map((item, index)=> <TrainingCard key={index} item={item}/>)}
              </div> : <span className="training-workout__text training-workout__text--empty">Список тренировок отсутствует</span>}

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Trainings;
