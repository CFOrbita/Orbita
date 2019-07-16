import React, {Component} from "react";
import DatePicker from "../add-training/add-training";
import "react-datepicker/dist/react-datepicker.css";
import CreatableSelect from 'react-select/creatable';
// import Options from "../../../../training-data/optionsData";

import TrainingSession from "../training-session/training-session";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      gym,
      startDate,
      onDateChange,
      onGymChange,
      onGymInputChange
    } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-header">
            <div className="card-header__info card-header__left">
              {/*<DatePicker*/}
              {/*className="card__date-picker"*/}
              {/*selected={startDate}*/}
              {/*dateFormat="dd/MM/yyyy"*/}
              {/*onChange={onDateChange}/>*/}

              {/*<CreatableSelect*/}
              {/*className="card__select"*/}
              {/*value={gym.newValue}*/}
              {/*placeholder="Зал"*/}
              {/*onChange={onGymChange}*/}
              {/*onInputChange={onGymInputChange}*/}
              {/*options={Options.optionsGyms}/>*/}
            </div>
          </div>

          <TrainingSession/>

        </div>
      </React.Fragment>
    )
  }
}

export default Card;
