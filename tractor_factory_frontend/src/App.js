import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Monitoring from './components/Monitoring'


export default function App() {
    
    return (
      <BrowserRouter>
      <div className="App" >
      <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/monitoring" component={ Monitoring } />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
