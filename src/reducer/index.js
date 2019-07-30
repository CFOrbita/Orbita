import {combineReducers} from "redux";
import {reducer as trainings} from "./trainings/trainingsData";


const reducer = combineReducers({
  trainings
});

// rootReducer = combineReducer:
//
// -- trainingsReducer (ACTIONS: CHANGE_NOTE) = combineReducer:
// ---- gymReducer (ACTIONS: GYM:CHANGE_NAME, GYM:CHANGE_INPUT_VALUE, GYM:CHANGE_DATE);
//
// ---- sessionsReducer (ACTIONS: SESSIONS:SET_EDITABLE_SESSION) = combineReducer:
// ------ partBodyReducer (ACTIONS: PART_BODY:CHANGE_BODY_PART)
// ------ excerciseReducer (ACTIONS: EXCERCISES:ADD_EXERCIZE, EXCERCISES:REMOVE_EXERCIZE, EXCERCISES:CHANGE_DATA, EXCERCISES:CHANGE_EXCERCIZE)

export default reducer;
