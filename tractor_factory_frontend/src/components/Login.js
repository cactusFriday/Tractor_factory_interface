import axios from 'axios';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js'
import './Login.css'

const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

export default function LoginForm() {
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      email: login,
      password: password
    };

    // Need consultation
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    axios.post(baseAPIUrl + '/users/login/', { user }, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        const token = res.data.user.token;
        const group = res.data.user.group;
        localStorage.setItem('token', token);
        localStorage.setItem('group', group);
        history.push("/monitoring");
        //console.log(res);
        //console.log(res.user.token);
        //console.log(res.user.group);

      })
      .catch((error) => {
        console.log(error.response.data.errors.error[0]);
        //
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
                onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>
              <input className="App-Input"
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                required="required"
                onChange={(e) => setPassword(e.target.value)} />
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