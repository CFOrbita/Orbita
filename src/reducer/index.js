import {combineReducers} from "redux";
import {reducer as trainings} from "./trainings/trainingsData";


const reducer = combineReducers({
  trainings
});

export default reducer;
