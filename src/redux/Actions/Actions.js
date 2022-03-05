import { ActionTypes } from "../constants/action-types";

export const fetchUsers = () => async (dispatch) => {
  const response = await fetch("https://devza.com/tests/tasks/listusers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
    },
  });

  console.log(response);
  const data = await response.json();
  console.log(data);

  dispatch({
    type: ActionTypes.FETCH_USERS,
    payload: data,
  });
};

export const fetchTasks = () => async (dispatch) => {
  const response = await fetch("https://devza.com/tests/tasks/list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
    },
  });

  console.log(response);
  const data = await response.json();
  console.log(data);

  const {tasks} = data;

  const sortedData = tasks.sort((a, b) =>
    a.created_on > b.created_on
      ? -1
      : 1
  );

  dispatch({
    type: ActionTypes.FETCH_TASKS,
    payload: sortedData,
  });
};

export const addTaskAction = (task) => async (dispatch) => {
  let fd = new FormData();
  fd.append("message", task.message);
  fd.append("due_date", task.due_date);
  fd.append("priority", task.priority);
  fd.append("assigned_to", task.assigned_to);

  const response = await fetch("https://devza.com/tests/tasks/create", {
    method: "POST",
    headers: {
      AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
    },
    body: fd,
  });

  console.log(response);
  const data = await response.json();
  console.log(data);

  if(data.status === "success"){
    alert("Task Added Successfully");
    dispatch(fetchTasks());
  }

  dispatch({
    type: ActionTypes.ADD_TASK,
    payload: data,
  });
};

export const updateTask = (task) => async (dispatch) => {

  console.log(task);
  let fd = new FormData();
  fd.append("message", task.message);
  fd.append("due_date", task.due_date);
  fd.append("priority", task.priority);
  fd.append("assigned_to", task.assigned_to);
  fd.append("taskid", task.taskid);

  const response = await fetch("https://devza.com/tests/tasks/update", {
    method: "POST",
    headers: {
      AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
    },
    body: fd,
  });

  console.log(response);
  const data = await response.json();
  console.log(data);

  if(data.status === "success"){
    alert("Task Edited Scccessfully");
    dispatch(fetchTasks());
  }

  dispatch({
    type: ActionTypes.UPDATE_TASK,
    payload: data,
  });
};


export const deleteTask = (id) => async (dispatch) => {

console.log(id);

  let fd = new FormData();

  fd.append("taskid", id);

  const response = await fetch("https://devza.com/tests/tasks/delete", {
    method: "POST",
    headers: {
      AuthToken: "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a",
    },
    body: fd,
  });

  console.log(response);
  const data = await response.json();
  console.log(data);
  if(data.status === "success"){
    alert('Task deleted successfully.')
    dispatch(fetchTasks());
  }

  dispatch({
    type: ActionTypes.DELETE_TASK,
    payload: data,
  });
};