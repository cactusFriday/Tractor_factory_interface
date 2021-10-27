import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Monitoring from './components/Monitoring'


export default function App() {
    
    return (
      <BrowserRouter>
      <div className="App" >
      <Switch>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/monitoring" component={ Monitoring } />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
