import * as tasksGateway from './tasks.gateway';
export const TASKS_LIST_RECIEVED = 'TASKS_LIST_RECIEVED';

const tasksListRecieved = (tasksList) => {
  const action = {
    type: TASKS_LIST_RECIEVED,
    payload: {
      tasksList,
    },
  };

  return action;
};

export const getTasksList = () => {
  const thunkAction = (dispatch) => {
    tasksGateway.fetchTasksList().then((tasksList) => {
      dispatch(tasksListRecieved(tasksList));
    });
  };
  return thunkAction;
};

export const updateTask = (taskId) => {
  const thunkAction = (dispatch, getState) => {
    const state = getState();
    const task = state.tasks.tasksList.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };
    tasksGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const deleteTask = (taskId) => {
  const thunkAction = (dispatch) => {
    tasksGateway.deleteTask(taskId).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const createTask = (text) => {
  const thunkAction = (dispatch) => {
    const task = {
      text,
      done: false,
    };
    tasksGateway.createTask(task).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};
