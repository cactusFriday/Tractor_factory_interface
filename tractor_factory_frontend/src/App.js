import './App.css';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRouteMonitoring, PrivateRouteRegister } from './components/PrivateRoute';
import Login from './components/Login';
import Monitoring from './components/Monitoring';
import Unauthorized from './components/Unauthorized';
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
        </Switch>
        </div>
        </BrowserRouter>
      );
    } 
  }
