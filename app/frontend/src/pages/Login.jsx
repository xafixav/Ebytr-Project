import React from 'react';

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
    return <div>hello world</div>;
  }
}
