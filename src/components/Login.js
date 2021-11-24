import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import logo from '../static/icons/ptz-logo.png';
import './Login.css'
import './style.css'

const authError = "Неверный логин или пароль!";
const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

export default function LoginForm() {
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
        const username = res.data.user.username;
        const email = res.data.user.email;
        localStorage.setItem('token', token);
        localStorage.setItem('group', group);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        history.push("/monitoring");
        //console.log(res);
        //console.log(res.user.token);
        //console.log(res.user.group);

      })
      .catch((error) => {
        console.log(error.response.data.errors.error[0]);
        setErrorMessage(authError);
        //
      })

  }

  return (
    <div>
      <body class="text-center">
      <header class="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
        <span style={{ textAlign: 'left', verticalAlign: 'middle', paddingLeft: '10px' }}>
          <img style={{ paddingRight: '10px' }} src={logo} alt='' />АО «Петербургский тракторный завод»
        </span>
      </header>

      <form onSubmit={handleSubmit} class="form-signin" style={{ paddingTop: '200px' }}>
        <h1 class="h3 mb-3 font-weight-normal">Вход в систему</h1>
        <label>
          <input
            class="form-control"
            style={{ marginBottom: '20px' }}
            type="text"
            name="login"
            placeholder="Почта пользователя"
            value={login}
            required="required"
            autoFocus="autoFocus"
            onChange={(e) => setLogin(e.target.value)} />
        </label>
        <label>
          <input
            class="form-control"
            style={{ marginBottom: '10px' }}
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            required="required"
            onChange={(e) => setPassword(e.target.value)} />
        </label>
        <h5 style={{ textAlign: 'center', color: 'red' }}>{errorMessage}</h5>
        <button class="btn btn-lg btn-primary btn-block float-end"
          type="submit">
          Войти
        </button>
      </form>

    </body>

      <footer></footer>
    </div>
  );
}