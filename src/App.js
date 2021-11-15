import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Monitoring from './components/Monitoring'
import Register from './components/Register'
import ConveyorConfig from './components/ConveyorConfig';


export default function App() {
    
    return (
      <BrowserRouter>
      <div className="App" >
      <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/monitoring" component={ Monitoring } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/config" component={ ConveyorConfig } />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
