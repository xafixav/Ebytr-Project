import React from 'react';
import OnChangeInput from '../components/OnChangeInput';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
    };
  }

  handleChange = (component) => {
    const { name, value } = component.target;
    this.setState({ [`${name}`]: value });
  };

  render() {
    return (
      <div>
        <OnChangeInput
          onChange={() => this.handleChange}
          name="user"
          type="text"
          dataTestId="userLoginInput"
        />
        <OnChangeInput
          onChange={() => this.handleChange}
          name="password"
          type="password"
          dataTestId="passwordLoginInput"
        />
      </div>
    );
  }
}
