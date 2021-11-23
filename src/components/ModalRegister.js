import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import close from "../static/icons/close.svg";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

class ModalRegister extends Component {

    constructor() {
        super();
        this.state = {
            error: '',
            username: "",
            email: "",
            group: "Guest",
            password: "",
            password_confirm: "",
        };


    };

    handleOnSubmit = (e) => {
        /* Метод для обработки формы. Получает информацию об инциденте из формы. 
        Отправляет PATCH запрос с обновлением информации об инциденте (регистрация инцидента)*/
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            group: this.state.group
        };
        // Сериализуем, отправляем на сервер, создавая новое происшествие.
        // При получении ответа обновляем состояние новым происшествием.
        // При обновлении состояния компонент рендерится заново, значит,
        // список с актуальными происшествиями, переданный как пропсы в компонент таблицы, будет отрендерен
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem("token");

        axios.post(baseAPIUrl + '/users/', { user }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
            .then(res => {
                this.props.setActive(false);
                toast.success("Пользователь успешно зарегестрирован!", {
                    style: {
                        backgroundColor: 'grey',
                        color: "white"
                    }
                })
            })
            .catch((error) => {
                this.setState({ error: "Ошибка во время регистрации пользователя" })
                if (error.response.status === 403) {
                    toast.error("Ошибка регистрации. Вы не авторизованы", {
                        style: {
                            backgroundColor: 'grey',
                            color: "white"
                        }
                    })
                }
                else if (error.response.status === 400) {
                    toast.error("Ошибка регистрации. Проверьте корректность введенных данных", {
                        style: {
                            backgroundColor: 'grey',
                            color: "white"
                        }
                    })
                }
                else {
                    toast.error("Ошибка регистрации", {
                        style: {
                            backgroundColor: 'grey',
                            color: "white"
                        }
                    })
                }
            });
    };


    render() {
        const isActive = this.props.isActive;

        return (
            <div className={isActive ? "container-fluid modalAccident active" : "container-fluid modalAccident"} onClick={() => this.props.setActive(false)}>
                <div className="modal__content" style={{ width: "450px" }} onClick={e => e.stopPropagation()}>
                    <div>
                        <img height='32px' style={{ marginTop: '10px', float: 'right', cursor: "pointer" }} src={close} alt="" onClick={() => this.props.setActive(false)} />
                    </div>
                    {
                        <React.Fragment>
                            <div className="App-InputForm">
                                <h3 className="Title">Регистрация нового пользователя в системе</h3>
                                <form onSubmit={this.handleOnSubmit}>
                                    <label>
                                        <input className="App-Input"
                                            type="text"
                                            name="username"
                                            placeholder="Имя пользователя"
                                            value={this.state.username}
                                            required="required"
                                            autofocus="autofocus"
                                            onChange={(e) => this.setState({ username: e.target.value })} />
                                    </label>

                                    <label>
                                        <input className="App-Input"
                                            type="email"
                                            name="email"
                                            placeholder="E-mail"
                                            value={this.state.email}
                                            required="required"
                                            onChange={(e) => this.setState({ email: e.target.value })} />
                                    </label>

                                    <label>
                                        <input className="App-Input"
                                            type="password"
                                            name="password"
                                            placeholder="Пароль (не менее 8 символов)"
                                            value={this.state.password}
                                            required="required"
                                            onChange={(e) => this.setState({ password: e.target.value })} />
                                    </label>

                                    <label>
                                        <input className="App-Input"
                                            type="password"
                                            name="password"
                                            placeholder="Подтверждение пароля"
                                            value={this.state.password_confirm}
                                            required="required"
                                            onChange={(e) => this.setState({ password_confirm: e.target.value })} />
                                    </label>

                                    <label>
                                        <select style={{ marginBottom: '10px', width: '300px', height: '46px', paddingLeft: '10px' }}
                                            onChange={(e) => this.setState({ group: e.target.value })}>
                                            <option value="Guest">Гость</option>
                                            <option value="Master">Мастер</option>
                                            <option value="Admin">Администратор</option>
                                        </select>
                                    </label>

                                    <div class="modal-footer">
                                        <button className="App-Button"
                                            type="submit" >
                                            Зарегистрировать
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </React.Fragment>
                    }

                </div>
                <Toaster position="bottom-right" />
            </div>
        )
    }
}

export default ModalRegister;
