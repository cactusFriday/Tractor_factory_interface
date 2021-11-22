import './App.css';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {  PrivateRouteMonitoring, PrivateRouteAdmin  } from './components/PrivateRoute';
import Login from './components/Login';
import Monitoring from './components/Monitoring';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized';
import ConveyorConfig from './components/ConveyorConfig';
import Users from './components/Users';
import SessionExpired from './components/SessionExpired';
import NotEnoughRights from './components/NotEnoughRights'; 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state= { value: "" };
  }
    render() {
      return (
      <BrowserRouter>
      <div className="App" >
      <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/unauthorized" component={ Unauthorized } />
      <Route exact path="/sessionexpired" component={ SessionExpired } />
      <Route exact path="/notenoughrights" component={ NotEnoughRights } />
      <PrivateRouteMonitoring exact path="/monitoring" component={ Monitoring } />
      <PrivateRouteAdmin exact path="/register" component={ Register } /> 
      <PrivateRouteAdmin exact path="/config" component={ ConveyorConfig } />
      <PrivateRouteAdmin exact path="/users" component={ Users } /> 
      </Switch>
      </div>
      </BrowserRouter>
    );
  } 
}

