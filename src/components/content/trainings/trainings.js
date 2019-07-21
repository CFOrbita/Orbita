import React, {Component} from "react";
import TrainingCard from "./training-card/training-card";
import TrainingCardAdd from "./add-training/add-training";

class Trainings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onSaveTrainings} = this.props;
    return (
      <React.Fragment>
        <div className="training">
          <ul className="training-points">
            <li className="training-points__item"><a className="training-points__link" href="#">Журнал</a></li>
            <li className="training-points__item"><a className="training-points__link" href="#">Статистика</a></li>
            <li className="training-points__item"><a className="training-points__link" href="#">Тестирование</a></li>
          </ul>
          <div className="training-workout">
            <a className="training-workout__text" href="#">Добавить тренировку</a>
            <TrainingCardAdd onSaveTrainings={onSaveTrainings}/>
            <div className="training-workout__list">
              <TrainingCard />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Trainings;
