import { combineReducers } from "redux";
import trainersReducer from "./trainersReducer";

const RootReducer = combineReducers({
	trainers: trainersReducer,
});

export default RootReducer;
