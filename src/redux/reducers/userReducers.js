import { ActionTypes } from "../constants/action-types";

const initialStateUsers = {
  users: {},
};

export const fetchUsersReducer = (state = initialStateUsers, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_USERS:
      return { ...state, users: payload };
    default:
      return state;
  }
};

const initialStateTasks = {
    tasks: [],
  };
  
  export const fetchTasksReducer = (state = initialStateTasks, { type, payload }) => {
    switch (type) {
      case ActionTypes.FETCH_TASKS:
        return { ...state, tasks: payload };
      default:
        return state;
    }
  };