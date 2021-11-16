import './App.css';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './components/Login';
import Monitoring from './components/Monitoring';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized';
import ConveyorConfig from './components/ConveyorConfig';
import Users from './components/Users';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state= { value: "" };
  }
    render() {
      return (
      <BrowserRouter>
      <div className="App" >
      <Switch     >
      <Route exact path="/" component={ Login } />
      <Route exact path="/unauthorized" component={ Unauthorized } />
      <PrivateRoute exact path="/monitoring" component={ Monitoring } />
      <PrivateRoute exact path="/register" component={ Register } /> 
      <PrivateRoute exact path="/config" component={ ConveyorConfig } />
      <PrivateRoute exact path="/users" component={ Users } />
      </Switch>
      </div>
      </BrowserRouter>
    );
  } 
}

