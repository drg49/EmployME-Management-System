import { combineReducers } from "redux";
import reminderReducer from "./reminderStore";
import userReducer from "./userStore";

const mainStore = combineReducers({
    user: userReducer,
    reminders: reminderReducer,
})

export default mainStore