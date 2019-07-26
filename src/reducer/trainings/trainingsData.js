const initialState = [];

const ActionType = {
  SAVE_TRAINING: `SAVE_TRAINING`,
  DELETE_TRAINING: `DELETE_TRAINING`
};

const actionSaveTraining = (state) => {
  return {
    type: ActionType.SAVE_TRAINING,
    payload: state
  };
};

const actionDeleteTraining = (state) => {
  return {
    type: ActionType.DELETE_TRAINING,
    payload: state
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_TRAINING:
      return [
        ...action.payload
      ];
    case ActionType.DELETE_TRAINING:
      return [
        ...action.payload
      ]
  }

  return state;
};


export {
  actionSaveTraining,
  actionDeleteTraining,
  reducer
};
