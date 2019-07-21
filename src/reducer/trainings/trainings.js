const initialState = [];

const ActionType = {
  SAVE_TRAININGS: `SAVE_TRAININGS`
};

const actionSaveTrainings = (items) => {
  return {
    type: ActionType.SAVE_TRAININGS,
    payload: items
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE_TRAININGS:
      return [
        ...state,
        action.payload
      ]
  }

  return state;
};


export {actionSaveTrainings, reducer};
