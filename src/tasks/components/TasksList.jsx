import React, { Component } from 'react';
import Task from './Task.jsx';
import PropTypes from 'prop-types';
import CreateTaskInput from './CreateTaskInput.jsx';
import * as tasksActions from '../tasks.actions';
import { sortedTaskListSelector } from '../tasks.selectors';
import { connect } from 'react-redux';

class TasksList extends Component {
  componentDidMount() {
    this.props.getTasksList();
  }

  render() {
    const { tasks } = this.props;
    return (
      <div className='todo-list'>
        <CreateTaskInput onCreate={this.props.createTask} />
        <ul className='list'>
          {tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              onChange={this.props.updateTask}
              onDelete={this.props.deleteTask}
            />
          ))}
        </ul>
      </div>
    );
  }
}

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  getTasksList: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
};

const mapState = (state) => {
  return {
    tasks: sortedTaskListSelector(state),
  };
};

const mapDispatch = {
  getTasksList: tasksActions.getTasksList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  createTask: tasksActions.createTask,
};

export default connect(mapState, mapDispatch)(TasksList);
