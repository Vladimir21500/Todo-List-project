import { createSelector } from 'reselect';

export const tasksListSelector = (state) => {
  return state.tasks.tasksList;
};

export const sortedTaskListSelector = createSelector(
  [tasksListSelector],
  (tasksList) => {
    return tasksList.slice().sort((a, b) => a.done - b.done);
  }
);
