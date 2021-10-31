import axios from 'axios';
import { useState, setState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js'
import './Register.css'

const baseAPIUrl = "/api/v1";

export default function RegisterForm() {
  this.state = {
    passwordsMatchFailed: false};
    
  const passwordsMatchFailed=false;

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();

    if (password !== password_confirm) {
      this.setState({ passwordsMatchFailed: true  })};

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
              <h3 className="Title">Регистрация в системе</h3>
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
              <label>
                <input className="App-Input" 
                type="password" 
                name="password" 
                placeholder="Подтверждение пароля"
                value={password_confirm}
                required="required"
                onChange={(e) => setPasswordConfirm(e.target.value)}/>
              </label>
              <div>
              { passwordsMatchFailed? <p>Пароли не совпадают</p> : null }
              </div>
              <button className="App-Button" 
              type="submit">
                Зарегистрироваться
                </button>
            </form>
            </div>
          </main>
          <footer></footer>
        </div>
    );
  }