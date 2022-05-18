import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
    };
  }

  render() {
    return <div>hello world</div>;
  }
}
