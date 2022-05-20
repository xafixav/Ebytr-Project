import React from 'react';
import PropTypes from 'prop-types';

export default class taskDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentKey: this.props.id,
      status: this.props.status,
    };
  }

  handleComponentChange = () => {
    const { onClick, id, task } = this.props;
    onClick({ id, task });
  };

  render() {
    const { task, dataTestId, id, taskIdSelected, status } = this.props;
    const { componentKey } = this.state;
    return (
      <li data-testid={dataTestId}>
        {task}
        <button>{status}</button>
        <button
          task={task}
          key={id}
          onClick={() => this.handleComponentChange()}
          type="button"
          disabled={taskIdSelected === componentKey}>
          Editar
        </button>
      </li>
    );
  }
}

taskDiv.propTypes = {
  onClick: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  taskIdSelected: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};
