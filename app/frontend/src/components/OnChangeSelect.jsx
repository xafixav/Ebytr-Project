import React from 'react';
import PropTypes from 'prop-types';

export default class OnChangeSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  renderOptions = () => {
    const { arrayOfOptions } = this.props;
    const result = arrayOfOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));

    return result;
  };

  render() {
    const { name, dataTestId, handleChange } = this.props;
    return (
      <select name={name} dataTestId={dataTestId} onChange={handleChange()}>
        {this.renderOptions()}
      </select>
    );
  }
}

OnChangeSelect.propTypes = {
  arrayOfOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
