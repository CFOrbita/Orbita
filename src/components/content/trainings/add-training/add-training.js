import React, {Component} from "react";
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TrainingSession from "../training-session/training-session";

const optionsCrossfit = [
  {value: 'interval', label: 'Интервально'},
  {value: 'asap', label: 'ЗКМБР'},
  {value: 'emom', label: 'ЕМОМ'},
  {value: 'ontime', label: 'На время'}
];

const optionsGyms = [
  {value: 'fitstudio', label: 'FitStudio'},
  {value: 'fizkult', label: 'Физкульт'},
  {value: 'fok', label: 'ФОК'},
  {value: 'redwhite', label: 'К&Б'}
];

class TrainingCardAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gym: {
        newValue: null,
        inputValue: null
      },
      startDate: new Date(),
      sessions: [],
    };

    this.handleGymChange = this.handleGymChange.bind(this);
    this.handleIGymInputChange = this.handleIGymInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleGymChange(newValue) {
    this.setState({
      gym: {
        newValue
      }
    });
  };

  handleIGymInputChange(inputValue) {
    this.setState({
      gym: {
        inputValue
      }
    });
  };

  handleDateChange(selectedData) {
    this.setState({selectedData});
  };

  render() {
    const {gym, startDate, sessions} = this.state;

    return (
      <React.Fragment>
        <section className="add-workout">
          <h1 className="add-workout__title">Редактирование</h1>
          <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>
          <form method="post" className="add-workout__form">
            <div className="add-workout__list">
              <div className="card">
                <div className="card-header">
                  <div className="card-header__info card-header__left">
                    <DatePicker
                      className="card__date-picker"
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={this.handleDateChange} />
                    <CreatableSelect
                      className="card__select"
                      value={gym.newValue}
                      placeholder="Зал"
                      onChange={this.handleGymChange}
                      onInputChange={this.handleIGymInputChange}
                      options={optionsGyms} />
                  </div>
                </div>

                <TrainingSession />

              </div>
            </div>
          </form>
        </section>
      </React.Fragment>
    )
  }
};

export default TrainingCardAdd;
