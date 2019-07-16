import React, {Component} from "react";
import Card from "../card/card";

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
    this.handleGymInputChange = this.handleGymInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleGymChange(newValue) {
    this.setState({
      gym: {
        newValue
      }
    });
  };

  handleGymInputChange(inputValue) {
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
    const {gym, startDate} = this.state;

    return (
      <React.Fragment>
        <section className="add-workout">
          <h1 className="add-workout__title">Редактирование</h1>
          <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>

          <div className="add-workout__list">
            <Card
              gym={gym}
              startDate={startDate}
              onDateChange={this.handleDateChange}
              onGymChange={this.handleGymChange}
              onGymInputChange={this.handleGymInputChange}
            />
          </div>

        </section>
      </React.Fragment>
    )
  }
}

export default TrainingCardAdd;
