import React, {Component} from "react";
import TrainingCardEdit from "../training-card-edit/training-card-edit";
import Workout from "../training-session/training-session";

class TrainingCardAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gym: {
        newValue: null,
        inputValue: null
      },
      startDate: new Date(),
      sessions: [{ partBody: null, exercise: null }],
    };

    this.handleGymChange = this.handleGymChange.bind(this);
    this.handleGymInputChange = this.handleGymInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleBodyPartChange = this.handleBodyPartChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleSetsChange = this.handleSetsChange.bind(this);
    this.handleRepeatsChange = this.handleRepeatsChange.bind(this);
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
    this.setState({
      selectedData
    });
  };

  handleBodyPartChange(selectedOption) {
    const first = this.state.sessions[0];
    this.setState({
      first: {
        partBody: selectedOption,
        exercise: null
      }
    });
  };

  handleExerciseChange(selectedOption) {
    this.setState(
      (prevState) => {
        return {
          session: {
            ...prevState.session,
            exercise: selectedOption
          }
        }
      });
  };

  handleSetsChange(value) {
    this.setState((prevState) => {
      return {
        session: {
          ...prevState.session,
          sets: value
        }
      }
    });
  };

  handleRepeatsChange(value) {
    this.setState((prevState) => {
      return {
        session: {
          ...prevState.session,
          repeats: value
        }
      }
    });
  };

  render() {
    const {gym, startDate, sessions} = this.state;

    return (
      <React.Fragment>
        <section className="add-workout">
          <h1 className="add-workout__title">Редактирование</h1>
          <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>

          <div className="add-workout__list">
            <TrainingCardEdit
              sessions={sessions}
              gym={gym}
              startDate={startDate}
              onDateChange={this.handleDateChange}
              onGymChange={this.handleGymChange}
              onGymInputChange={this.handleGymInputChange}
              onPartBodyChange={this.handleBodyPartChange}
              onExerciseChange={this.handleExerciseChange}
              onSetsChange={this.handleSetsChange}
              onRepeatsChange={this.handleRepeatsChange}
            />
          </div>

        </section>
      </React.Fragment>
    )
  }
}

export default TrainingCardAdd;
