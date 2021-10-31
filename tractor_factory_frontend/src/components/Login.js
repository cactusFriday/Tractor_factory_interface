import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js'
import './Login.css'

const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

export default function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      login: login,
      password: password
    };

    axios.post(baseAPIUrl + '/users/login', { user }, {
      headers: { 
        'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.user.error || res.status !== 200) {
          throw new Error(res.user.error);
        }
        else {
          const token = res.user.token;
          const group = res.user.group;
          localStorage.setItem('token', token);
          localStorage.setItem('group', group);
          //console.log(res);
          //console.log(res.user.token);
          //console.log(res.user.group);
        }
        
      })
    }
    
    return (
      <div className="App">
        <header className="App-header">
        <Navbar />
          </header>
          <main className="App-main">
            <div className="App-InputForm">
              <h3 className="Title">Вход в систему</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <input className="App-Input" 
                type="text" 
                name="login" 
                placeholder="Имя пользователя"
                value={login}
                required="required"
                autoFocus="autoFocus"
                onChange={(e) => setLogin(e.target.value)}/>
              </label>
              <label>
                <input className="App-Input" 
                type="password" 
                name="password" 
                placeholder="Пароль"
                value={password}
                required="required"
                onChange={(e) => setPassword(e.target.value)}/>
              </label>
              <button className="App-Button" 
              type="submit">
                Войти
                </button>
            </form>
            </div>
          </main>
          <footer></footer>
        </div>
    );
  }
