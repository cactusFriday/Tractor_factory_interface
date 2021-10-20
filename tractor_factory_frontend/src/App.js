import axios from 'axios';
import { useState } from 'react';
import './App.css';

export default function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const headers = {}
  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      login: login,
      password: password
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user }, {
      headers: headers
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    
    return (
      <div className="App">
        <header className="App-header">
          </header>
          <main className="App-main">
            <div className="App-InputForm">
              <p className="Title">Панель администратора</p>
            <form onSubmit={handleSubmit}>
              <label>
                <input className="App-Input" 
                type="text" 
                name="login" 
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}/>
              </label>
              <label>
                <input className="App-Input" 
                type="password" 
                name="password" 
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </label>
              <button className="App-Button" 
              type="submit">
                Войти
                </button>
            </form>
            <a className="Link-Password" href="">Забыли пароль?</a>
            </div>
          </main>
          <footer></footer>
        </div>
    );
  }
