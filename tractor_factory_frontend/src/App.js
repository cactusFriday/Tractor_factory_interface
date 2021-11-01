import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'

export default function App() {
    
    return (
      <BrowserRouter>
      <div className="App" >
      <Route exact path="/" component={ Login } />
      </div>
      </BrowserRouter>
    );
  }
