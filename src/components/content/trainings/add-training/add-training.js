import React, {Component} from "react";
import Select from "react-select";

const options = [
  {value: 'interval', label: 'Интервально'},
  {value: 'asap', label: 'ЗКМБР'},
  {value: 'emom', label: 'ЕМОМ'},
  {value: 'ontime', label: 'На время'}
];

class TrainingCardAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (selectedOption) {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <React.Fragment>
        <section className="add-workout">
          <h1 className="add-workout__title">Редактирование</h1>
          <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>
          <form method="post" className="add-workout__form">
            <div className="add-workout__list card">
              <div className="card-item">
                <div className="card-header">
                  <div className="card-header__func card-header--left">
                    <div className="card-header__func-item card-select">
                      <Select
                        value={selectedOption}
                        placeholder="Выбрать"
                        onChange={this.handleChange}
                        options={options}/>
                      {/*<select className="card-header__func-menu card-select">*/}
                      {/*<option selected disabled>Режим</option>*/}
                      {/*<option className="card-select__item">Интервально</option>*/}
                      {/*<option className="card-select__item">ЗКМБР</option>*/}
                      {/*<option className="card-select__item">ЕМОМ</option>*/}
                      {/*<option className="card-select__item">На время</option>*/}
                      {/*</select>*/}
                    </div>
                    <input className="card-header__func-item card-header__func--input" type="number" placeholder="0"
                           id="time"/>
                    <label className="card-header__func-item card-label" htmlFor="time">мин.</label>
                    <div className="card-header__func-item plus">
                      <i className="fas fa-plus add-plus"></i>
                    </div>
                  </div>
                  <div className="card-header__func card-header--right">
                    <input type="checkbox" id="done"/>
                    <label htmlFor="done" className="checkbox"></label>
                    <span className="checkbox__text">Выполнено</span>
                  </div>
                </div>
                <div className="card-content__wrapper">
                  <div className="card-content card-content--add-workout">
                    <div className="card-content__workout">
                      <div className="input-wrapper">
                        <input className="card-content__workout-item card-content--input" type="number" placeholder="0"
                               id="reps"/>
                        <span>x</span>
                        <input className="card-content__workout-item card-content--input input-sets" type="number"
                               placeholder="0" id="sets"/>
                      </div>
                    </div>
                    <select className="card-content__workout-item card-select">
                      <option selected disabled>Упражнение</option>
                      <option className="card-select__item">Подтягивания</option>
                      <option className="card-select__item">Cтановая тяга</option>
                    </select>
                    <select className="card-content__workout-item card-select">
                      <option selected disabled>Снаряд</option>
                      <option className="card-select__item">штанга</option>
                      <option className="card-select__item">медбол</option>
                      <option className="card-select__item">гиря</option>
                      <option className="card-select__item">гантель</option>
                      <option className="card-select__item">диск</option>
                      <option className="card-select__item">сендбэг</option>
                    </select>
                    <div className="input-wrapper">
                      <input className="card-content__workout-item card-content--input minutes" type="number"
                             placeholder="0" id="minutes"/>
                      <label className="card-label" htmlFor="minutes">мин.</label>
                    </div>
                    <div className="card-content__workout-item delete"><i className="fas fa-trash-alt"></i></div>
                  </div>
                  <div className="card-content card-comment">
                    <textarea className="card-comment__textarea" placeholder="Для заметок"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </React.Fragment>
    )
  }
};

export default TrainingCardAdd;
