import React from 'react';
import PropTypes from 'prop-types';

export default class OnChangeInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, onChange, type, dataTestId, value } = this.props;
    return (
      <div>
        <input
          name={name}
          onChange={onChange()}
          type={type}
          data-testid={dataTestId}
          value={value}
        />
      </div>
    );
  }
}

OnChangeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
