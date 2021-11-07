import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Monitoring from './components/Monitoring'
import Register from './components/Register'


export default function App() {
    
    return (
      <BrowserRouter>
      <div className="App" >
      <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/monitoring" component={ Monitoring } />
      <Route exact path="/register" component={ Register } />
          
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
