import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js'
import './Login.css'

const baseAPIUrl = "/api/v1";

export default function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      login: login,
      password: password
    };

    let token = localStorage.getItem("token");

    axios.post(baseAPIUrl + '', { user }, 
    {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    
    return (
      <div className="App">
      <head>
      <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <title>Вход в систему</title>
      </head>
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
                autofocus="autofocus"
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