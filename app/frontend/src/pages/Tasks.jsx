import React from 'react';
import TaskDiv from '../components/taskDiv';
import OnChangeInput from '../components/OnChangeInput';
import ApiFetch from '../utility/apiFetch';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.api = new ApiFetch();

    this.state = {
      task: '',
      taskList: [],
      taskIdSelected: null,
    };
  }

  updateState = (component) => {
    const { key, task } = component.target;
    this.setState({ taskIdSelected: key, task });
  };

  handleChange = (component) => {
    const { value } = component.target;
    this.setState({ taskIdSelected: null, task: value });
  };

  handleClick = (component) => {
    this.updateState(component);
  };

  renderTaskList = () => {
    const { taskList, taskIdSelected } = this.state;
    const allTasks = taskList.map(({ task, id }) => (
      <TaskDiv
        key={id}
        task={task}
        onClick={() => this.handleClick}
        taskIdSelected={taskIdSelected}
        id={id}
      />
    ));

    return allTasks;
  };

  render() {
    return (
      <div>
        <OnChangeInput />
        <ol>{this.renderTaskList()}</ol>
      </div>
    );
  }
}
