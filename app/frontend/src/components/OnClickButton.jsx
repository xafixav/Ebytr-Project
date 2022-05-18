import React from 'react';
import PropTypes from 'prop-types';

export default class OnClickButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { innerText, onClick, dataTestId, noEmptyField } = this.props;
    return (
      <div>
        <button onClick={onClick()} type="button" data-testid={dataTestId} disabled={noEmptyField}>
          {innerText}
        </button>
      </div>
    );
  }
}

OnClickButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  innerText: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  noEmptyField: PropTypes.bool.isRequired,
};
