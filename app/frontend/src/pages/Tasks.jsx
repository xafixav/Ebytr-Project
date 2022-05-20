import React from 'react';
import TaskDiv from '../components/taskDiv';
import OnChangeInput from '../components/OnChangeInput';
import ApiFetch from '../utility/apiFetch';
import OnClickButton from '../components/OnClickButton';
import OnChangeSelect from '../components/OnChangeSelect';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.api = new ApiFetch();

    this.state = {
      task: '',
      taskList: [],
      taskIdSelected: 0,
      editingTask: false,
      noEmptyField: false,
      status: 'Pendente',
      statusOptions: ['Pendente', 'Em andamento', 'Pronto'],
      sortOptions: ['Alfabética', 'Data de Criação', 'Status'],
      sort: 'Data de Criação',
    };
  }

  sortBy = () => {
    const { sort, taskList } = this.state;

    if (sort === 'Data de Criação') {
      return this.setState({ taskList: taskList.sort((a, b) => a.id - b.id) });
    }
    if (sort === 'Alfabética') {
      return this.setState({ taskList: taskList.sort((a, b) => a.task - b.task) });
    }
    if (sort === 'Status') {
      return this.setState({ taskList: taskList.sort((a, b) => a.status - b.status) });
    }
  };

  getTaskList = async () => {
    const taskList = await this.api.tasksFetch();
    this.setState({ taskList: taskList });
  };

  cleanTask = () => {
    this.setState({ task: '', taskIdSelected: 0, editingTask: false });
  };

  postTask = async () => {
    const { task, status, noEmptyField } = this.state;
    if (noEmptyField && task !== '') {
      await this.api.taskPost({ task, status });
      await this.getTaskList();
      this.cleanTask();
    }
  };

  putTask = async () => {
    const { task, status, taskIdSelected, noEmptyField } = this.state;
    if (noEmptyField && task !== '') {
      await this.api.taskPut({ task, status, id: taskIdSelected });
      await this.getTaskList();
    }
  };

  handleSaveButton = async () => {
    const { editingTask } = this.state;
    if (editingTask) {
      return await this.putTask();
    }
    this.postTask();
  };

  handleSelectChange = (component) => {
    const { value } = component.target;
    this.setState({ status: value });
  };

  componentDidMount() {
    this.getTaskList();
  }

  updateState = (data) => {
    const { id, task } = data;
    this.setState({ taskIdSelected: id, task, editingTask: true });
  };

  isEmpty = () => {
    const { task } = this.state;
    if (task && task !== '') {
      this.setState({ noEmptyField: true });
    } else {
      this.setState({ noEmptyField: false });
    }
  };

  handleChangeTaskInput = (component) => {
    const { name, value } = component.target;
    this.setState({ [`${name}`]: value }, this.isEmpty);
  };

  handleChangeStatus = (component) => {
    const { name, value } = component.target;

    this.setState({ [`${name}`]: value }, () => {
      if (name === 'sort') this.sortBy();
    });
  };

  handleClick = (data) => {
    this.updateState(data);
    this.isEmpty();
  };

  renderTaskList = () => {
    const { taskList, taskIdSelected } = this.state;
    const allTasks = taskList.map(({ task, id, status }) => (
      <TaskDiv
        key={id}
        task={task}
        onClick={this.handleClick}
        taskIdSelected={taskIdSelected}
        status={status}
        id={id}
        dataTestId="taskLi"
      />
    ));

    return allTasks;
  };

  renderSelectOptions = () => {
    const { statusOptions } = this.state;
    return (
      <OnChangeSelect
        name="status"
        arrayOfOptions={statusOptions}
        dataTestId="statusOptions"
        handleChange={() => this.handleChangeStatus}
      />
    );
  };

  renderSortOptions = () => {
    const { sortOptions } = this.state;
    return (
      <OnChangeSelect
        name="sort"
        arrayOfOptions={sortOptions}
        dataTestId="sortOption"
        handleChange={() => this.handleChangeStatus}
      />
    );
  };

  render() {
    const { task, noEmptyField } = this.state;
    return (
      <div>
        <h2>Insira sua tarefa:</h2>
        <div>
          <OnChangeInput
            name="task"
            onChange={() => this.handleChangeTaskInput}
            type="text"
            value={task}
            dataTestId="TaskInput"
          />
          {this.renderSelectOptions()}
          {this.renderSortOptions()}
          <OnClickButton
            innerText="Enviar"
            noEmptyField={!noEmptyField}
            dataTestId="SendTaskButton"
            onClick={() => this.handleSaveButton}
          />
        </div>
        <ol>{this.renderTaskList()}</ol>
      </div>
    );
  }
}
