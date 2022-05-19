import React from 'react';
import PropTypes from 'prop-types';

export default class taskDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentKey: this.props.id,
    };
  }

  render() {
    const { task, onClick, dataTestId, id, taskIdSelected } = this.props;
    const { componentKey } = this.state;
    return (
      <li data-testid={dataTestId}>
        {task}
        <button
          task={task}
          key={id}
          onClick={onClick()}
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
};
