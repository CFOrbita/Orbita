const initialState = [];

const ActionType = {
  SAVE_TRAININGS: `SAVE_TRAININGS`
};

const actionSaveTrainings = (item) => {
  return {
    type: ActionType.SAVE_TRAININGS,
    payload: item
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
