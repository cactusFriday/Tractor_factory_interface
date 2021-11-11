import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js'
import './Register.css'

const registerError = "Не удалось зарегистрировать пользователя!";
const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

export default function RegisterForm() {
    //this.state = {
    //passwordsMatch: true};
    
  let passwordsMatch=true;
  const isAdmin=true;

  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    if (password !== password_confirm) {
      passwordsMatch = false};
      //this.setState({ passwordsMatch: false  })}

    const user = {
      username: username,
      email: email,
      password: password,
      group: group
    };

    let token = localStorage.getItem("token");

    axios.post(baseAPIUrl + '/users/', { user }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
    })

    .then(res => {
      console.log(res);
      console.log(res.data);
    })

  //  .catch((error) => {
  //    console.log(error.response.data.errors.error[0]);
  //    setErrorMessage(registerError);
  //  })
  };
    
    return (
      <div className="App">
        <header className="App-header">
        <Navbar />
          </header>
          <main className="App-main">
            <div className="App-InputForm">
              <h3 className="Title">Регистрация нового пользователя в системе</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <input className="App-Input" 
                type="text" 
                name="username" 
                placeholder="Имя пользователя"
                value={username}
                required="required"
                autofocus="autofocus"
                onChange={(e) => setUsername(e.target.value)}/>
              </label>

              <label>
                <input className="App-Input" 
                type="email" 
                name="email" 
                placeholder="E-mail"
                value={email}
                required="required"
                onChange={(e) => setEmail(e.target.value)}/>
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
              { passwordsMatch? null : <p>Пароли не совпадают</p>}
              </div>

              <label>
                <p>Группа:</p>
                  <select 
                    onChange={(e) => setGroup(e.target.value)}>
                    <option value="Admin">Администратор</option>
                    <option value="Master">Мастер</option>
                    <option value="Guest">Гость</option>
                  </select>
              </label>

              <button className="App-Button" 
              type="submit">
                Зарегистрировать
                </button>
                <h5 style={{ textAlign: 'center', color: 'red' }}>{errorMessage}</h5>
            </form>
            </div>
          </main>
          <footer></footer>
        </div>
    );
  }