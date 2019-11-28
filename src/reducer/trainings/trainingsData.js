const initialState = [];

const ActionType = {
  SAVE_TRAINING: `SAVE_TRAINING`,
  CANCEL_TRAINING: `CANCEL_TRAINING`,
  DELETE_TRAINING: `DELETE_TRAINING`,
  SET_TRAININGS: `SET_TRAININGS`
};

const actionSetTrainings = (state) => {
  return {
    type: ActionType.SET_TRAININGS,
    payload: state
  }
};

const actionSaveTraining = (state) => {
  return {
    type: ActionType.SAVE_TRAINING,
    payload: state
  }
};

const actionDeleteTraining = (state) => {
  return {
    type: ActionType.DELETE_TRAINING,
    payload: state
  }
};

const actionCancelTraining = () => {
  return {
    type: ActionType.CANCEL_TRAINING
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_TRAINING:
      return [
        ...action.payload
      ];
    case ActionType.CANCEL_TRAINING:
      return [
        ...state
      ];
    case ActionType.DELETE_TRAINING:
      return [
        ...action.payload
      ];
    case ActionType.SET_TRAININGS:
      return [
        ...action.payload
      ];
  }

  return state;
};


export {
  actionSaveTraining,
  actionCancelTraining,
  actionDeleteTraining,
  actionSetTrainings,
  reducer
};
