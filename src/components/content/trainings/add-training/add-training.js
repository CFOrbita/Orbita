import React, {Component} from "react";
import TrainingCardEdit from "../training-card-edit/training-card-edit";

class TrainingCardAdd extends Component {
  constructor(props) {
    super(props);

    const {editingTraining} = props;

    this.state = {
      id: editingTraining && editingTraining.id || this.props.id(),
      gym:  editingTraining && editingTraining.gym || { name: null, inputValue: null },
      date:  editingTraining && editingTraining.date || new Date(),
      sessions:  editingTraining && editingTraining.sessions || [
        {
          id: 1,
          partBody: null,
          exercises: [{id:1, exercise: null}]
        }
        ],
      note:  editingTraining && editingTraining.note || ''
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
    this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
    this.handleSaveTraining = this.handleSaveTraining.bind(this);
    this.handleAddWorkout = this.handleAddWorkout.bind(this);
  }

  sessionFinder(id) {
    // 1. Make a shallow copy of the items
    const sessions = [...this.state.sessions];
    // 1.1 Find current object's index
    const indexSession = sessions.findIndex((session => session.id === id));
    // 2. Make a shallow copy of the item you want to mutate
    let session = {...sessions[indexSession]};

    return {session, indexSession}
  }

  exercisesFinder(id, indexSession) {
    const exercises = [...this.state.sessions[indexSession].exercises];
    const indexWorkout = exercises.findIndex((workout => workout.id === id));

    let workout = {...exercises[indexWorkout]};

    return {workout, indexWorkout}
  }

  defineLastId(indexSession) {
    let iterableArr = indexSession !== undefined ? [...this.state.sessions[indexSession].exercises] : [...this.state.sessions];
    let id = 0;

    iterableArr.forEach((item) => {
      if (item.id > id) {
        id = item.id
      }
    });

    return id;
  }

  handleGymChange(name) {
    this.setState(prev => {
      return {
        gym: {
          ...prev.gym,
          name
        }
      }
    });
  };

  handleGymInputChange(inputValue) {
    this.setState(prev => {
      return {
        gym: {
          ...prev.gym,
          inputValue
        }
      }
    });
  };

  handleDateChange(selectedData) {
    this.setState({
      date: selectedData
    });
  };

  handleBodyPartChange(selectedOption, id) {
    let sessions = [...this.state.sessions];
    const {session, indexSession} = this.sessionFinder(id); //returns new copy of object
    // 3. Replace the property you're intested in
    session.partBody = selectedOption;
    if (session.exercises.length === 1) {
      session.exercises[0].exercise = null;
    } else {
      session.exercises.length = 0;
      session.exercises.push({id:1, exercise: null});
    }

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    sessions[indexSession] = session;
    // 5. Set the state to our new copy
    this.setState({sessions});
  };

  handleExerciseChange(selectedOption, idSession, idWorkout) {
    let sessions = [...this.state.sessions];

    const {session, indexSession} = this.sessionFinder(idSession); //returns new copy of object
    const {workout, indexWorkout} = this.exercisesFinder(idWorkout, indexSession); //returns new copy of object

    workout.exercise = selectedOption;
    sessions[indexSession].exercises[indexWorkout] = workout;

    this.setState({sessions});
  };

  handleInputChange(event, idSession, idWorkout) {
    const value = event.target.value;
    const name = event.target.name;

    let sessions = [...this.state.sessions];
    const {session, indexSession} = this.sessionFinder(idSession); //returns new copy of object
    const {workout, indexWorkout} = this.exercisesFinder(idWorkout, indexSession); //returns new copy of object

    workout[name] = value;
    sessions[indexSession].exercises[indexWorkout] = workout;

    this.setState({sessions});
  };

  handleTextareaChange(event) {
    this.setState({
      note: event.target.value
    })
  }

  handleDeleteSession(id) {
    let sessions = [...this.state.sessions];
    if (sessions.length === 1) return;

    this.setState(state => {
      const sessions = state.sessions.filter(item => item.id !== id);

      return {sessions};
    });
  }

  handleDeleteExercise(idSession, idWorkout) {
    let sessions = [...this.state.sessions];

    const {session, indexSession} = this.sessionFinder(idSession); //returns new copy of object

    if(sessions[indexSession].exercises.length === 1) {
      return;
    } else {
      sessions[indexSession].exercises = sessions[indexSession].exercises.filter(item => item.id !== idWorkout);

      this.setState({sessions});
    }
  }

  handleAddWorkout(idSession) {
    let sessions = [...this.state.sessions];
    const {session, indexSession} = this.sessionFinder(idSession); //returns new copy of object
    const newId = this.defineLastId(indexSession) + 1;

    sessions[indexSession].exercises.push({id: newId, exercise: null});

    this.setState({sessions});
  }

  handleAddSession() {
    let sessions = [...this.state.sessions];
    const newId = this.defineLastId() + 1;

    sessions.push({ id: newId, partBody: null, exercises: [{id:1, exercise: null}] });

    this.setState({sessions});
  }

  handleSaveTraining() {
    let training = {...this.state};
    const error = this.isValid();

    if (error) {
      this.setState({error});
    } else {
      this.props.onSaveTraining(training);
    }
  }

  isValid() {
    const {sessions} = this.state;

    let error = false;

    for (let i = 0; i < sessions.length; i++) {
      const {exercises} = sessions[i];

      if (sessions[i].partBody === null) {
        error = true;
        return error;
      }

      for (let j = 0; j < exercises.length; j++) {
        if (exercises[j].exercise === null) {
          error = true;
          return error;
        }
      }
    }

    return error;
  }

  render() {
    const {error, gym, date, sessions} = this.state;
    const {onCancel} = this.props;

    return (
      <React.Fragment>
        <section className="add-workout">
          <h1 className="add-workout__title">Редактирование</h1>
          <p className="add-workout__text">На этой странице вносятся изменения в тренировку</p>

          <div className="add-workout__list">
            <TrainingCardEdit
              error={error}
              sessions={sessions}
              gym={gym}
              date={date}
              onDateChange={this.handleDateChange}
              onGymChange={this.handleGymChange}
              onGymInputChange={this.handleGymInputChange}
              onPartBodyChange={this.handleBodyPartChange}
              onExerciseChange={this.handleExerciseChange}
              onInputChange={this.handleInputChange}
              onTextareaChange={this.handleTextareaChange}
              onDeleteSession={this.handleDeleteSession}
              onDeleteExercise={this.handleDeleteExercise}
              onAddSession={this.handleAddSession}
              onSaveTraining={this.handleSaveTraining}
              onAddWorkout={this.handleAddWorkout}
              onCancel={onCancel}
            />
          </div>

        </section>
      </React.Fragment>
    )
  }
}

export default TrainingCardAdd;
