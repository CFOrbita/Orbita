import {combineReducers} from "redux";
import {reducer as trainings} from "./trainings/trainings";


const reducer = combineReducers({
  trainings
});

export default reducer;
