import { combineReducers } from "redux";
import userReducer from "./userStore";

const mainStore = combineReducers({
    user: userReducer,
})

export default mainStore