import {combineReducers} from "redux";
import {reducer as trainings} from "./trainings/trainingsData";
import sessionReducer from "./session/session";
import userReducer from "./user/user";
import messageReducer from "./message/message";


const reducer = combineReducers({
  trainings,
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
});

export default reducer;
