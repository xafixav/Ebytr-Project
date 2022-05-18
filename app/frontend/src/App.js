import './css/App.css';
import React from 'react';
import Login from './pages/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/tasks" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
