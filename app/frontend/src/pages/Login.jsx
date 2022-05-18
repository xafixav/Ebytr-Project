import React from 'react';
import OnChangeInput from '../components/OnChangeInput';
import OnClickButton from '../components/OnClickButton';
import ApiFetch from '../utility/apiFetch';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.api = new ApiFetch();

    this.state = {
      user: '',
      password: '',
      noEmptyField: false,
    };
  }

  updateState = (component) => {
    const { name, value } = component.target;
    this.setState({ [`${name}`]: value });
  };

  handleChange = (component) => {
    const { user, password, noEmptyField } = this.state;
    this.updateState(component);
    if (user && password) {
      return this.setState({ noEmptyField: true });
    }
    if ((!user || !password) && noEmptyField === true) {
      return this.setState({ noEmptyField: false });
    }
  };

  handleClick = async () => {
    const { user, password } = this.state;
    const { loginFetch } = this.api;
    const { history } = this.props;
    const token = await loginFetch({ user, password });
    if (typeof token === 'string') {
      localStorage.setItem('userToken', token);
      history.push('/tasks');
    }
  };

  renderLoginButton = () => {
    const { noEmptyField } = this.state;
    return (
      <OnClickButton
        onClick={() => this.handleClick}
        noEmptyField={!noEmptyField}
        innerText="Login"
        dataTestId="LoginButton"
      />
    );
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
        {this.renderLoginButton()}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};
