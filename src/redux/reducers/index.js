import { combineReducers } from "redux";
import { fetchUsersReducer,fetchTasksReducer } from "./userReducers";


const reducers = combineReducers({
    fetchUsersReducer,
    fetchTasksReducer
});

export default reducers;