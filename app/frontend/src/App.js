import './css/App.css';
import React from 'react';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
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
          <Route exact path="/tasks" component={Tasks} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
