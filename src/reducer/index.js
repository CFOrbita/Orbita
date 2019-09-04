import {combineReducers} from "redux";
import {reducer as trainings} from "./trainings/trainingsData";
import sessionReducer from "./session/session";
import userReducer from "./user/user";


const reducer = combineReducers({
  trainings,
  sessionState: sessionReducer,
  userState: userReducer,
});

export default reducer;
