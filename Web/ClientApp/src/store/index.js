import { combineReducers } from "redux";
import counterReducer from "./counterStore";

const mainStore = combineReducers({
    counter: counterReducer,
})

export default mainStore