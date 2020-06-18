const initialState = {
  isLoading: false,
  trainings: []
};

const ActionType = {
  SAVE_TRAININGS: `SAVE_TRAININGS`,
  CANCEL_TRAINING: `CANCEL_TRAINING`,
  DELETE_TRAINING: `DELETE_TRAINING`,
  SET_TRAININGS: `SET_TRAININGS`,
  LOADING_TRAININGS: `LOADING_TRAININGS`,
};

const actionLoadingTrainings = (value) => {
  return {
    type: ActionType.LOADING_TRAININGS,
    payload: value
  }
};

const actionSetTrainings = (state) => {
  return {
    type: ActionType.SET_TRAININGS,
    payload: state
  }
};

const actionSaveTrainings = (state) => {
  return {
    type: ActionType.SAVE_TRAININGS,
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

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionType.SAVE_TRAININGS:
      return {
        ...state,
        trainings: payload
      };
    case ActionType.CANCEL_TRAINING:
      return {
        ...state
      };
    case ActionType.DELETE_TRAINING:
      return {
        ...state,
        trainings: payload
      };
    case ActionType.SET_TRAININGS:
      return {
        ...state,
        trainings: payload
      };
    case ActionType.LOADING_TRAININGS: {
      return {
        ...state,
        isLoading: payload
      }
    }
  }

  return state;
};


export {
  actionLoadingTrainings,
  actionSaveTrainings,
  actionCancelTraining,
  actionDeleteTraining,
  actionSetTrainings,
  reducer
};
