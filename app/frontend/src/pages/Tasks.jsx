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
    const { name, value } = component.target;
    this.setState({ [`${name}`]: value, taskIdSelected: null });
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
    const { task } = this.state;
    return (
      <div>
        <h2>Insira sua tarefa:</h2>
        <OnChangeInput
          name="task"
          onChange={() => this.handleChange}
          type="text"
          value={task}
          dataTestId="TaskInput"
        />
        <ol>{this.renderTaskList()}</ol>
      </div>
    );
  }
}
