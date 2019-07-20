import React, {Component} from "react";
import TrainingCardEdit from "../training-card-edit/training-card-edit";

class TrainingCardAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gym: {
        newValue: null,
        inputValue: null
      },
      startDate: new Date(),
      sessions: [{id: '1', partBody: null}],
      note: ''
    };

    this.handleGymChange = this.handleGymChange.bind(this);
    this.handleGymInputChange = this.handleGymInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleBodyPartChange = this.handleBodyPartChange.bind(this);
    this.handleExerciseChange = this.handleExerciseChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleDeleteSession = this.handleDeleteSession.bind(this);
    this.handleAddSession = this.handleAddSession.bind(this);
    this.sessionFinder = this.sessionFinder.bind(this);
  }

  sessionFinder(id) {
    // 1. Make a shallow copy of the items
    const sessions = [...this.state.sessions];
    // 1.1 Find current object's index
    const index = sessions.findIndex((session => session.id === id));
    // 2. Make a shallow copy of the item you want to mutate
    let session = {...sessions[index]};

    return {session, index}
  }

  defineLastId() {
    const sessions = [...this.state.sessions];
    let id = 0;

    sessions.forEach((item) => {
      if (item.id > id) {
        id = item.id
      }
    });

    return Number(id);
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

  handleBodyPartChange(selectedOption, id) {
    let sessions = [...this.state.sessions];
    const {session, index} = this.sessionFinder(id);
    // 3. Replace the property you're intested in
    session.partBody = selectedOption;
    session.exercise = null;
    if (session.sets || session.repeats) {
      session.sets = null;
      session.repeats = null;
    }
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    sessions[index] = session;
    // 5. Set the state to our new copy
    this.setState({sessions});
  };

  handleExerciseChange(selectedOption, id) {
    let sessions = [...this.state.sessions];
    const {session, index} = this.sessionFinder(id);

    session.exercise = selectedOption;
    sessions[index] = session;

    this.setState({sessions});
  };

  handleInputChange(event, id) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let sessions = [...this.state.sessions];
    const {session, index} = this.sessionFinder(id);

    session[name] = value;
    sessions[index] = session;

    this.setState({sessions});
  };

  handleTextareaChange(event) {
    this.setState({
      textarea: event.target.value
    })
  }

  handleDeleteSession(id) {
    this.setState(state => {
      const sessions = state.sessions.filter(item => item.id !== id);

      return {sessions};
    });
  }

  handleAddSession() {
    let sessions = [...this.state.sessions];
    const newId = this.defineLastId() + 1;

    sessions.push({id: newId, partBody: null});

    this.setState({sessions});
  }

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
              onInputChange={this.handleInputChange}
              onTextareaChange={this.handleTextareaChange}
              onDeleteSession={this.handleDeleteSession}
              onAddSession={this.handleAddSession}
            />
          </div>

        </section>
      </React.Fragment>
    )
  }
}

export default TrainingCardAdd;
