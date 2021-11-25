import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalRegister.css';
import close from "../static/icons/close.svg";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const baseAPIUrl = "https://tractor-factory-interface.herokuapp.com/api";

class ModalRegister extends Component {

    constructor() {
        super();
        this.state = {
            error: "",
            username: "",
            email: "",
            group: "Guest",
            password: "",
            password_confirm: "",
            is_match: false,
        };


    };

    checkPassword() {
        if (this.state.password == this.state.password_confirm) {
            this.setState({ is_match: true});
        }
        else {
            this.setState({ is_match: false});
        }
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            group: this.state.group
        };

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.defaults.withCredentials = true;
        let token = localStorage.getItem("token");


        this.checkPassword();
        if (this.state.is_match) {
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
                    this.checkPassword()
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
                        if (this.state.password.length < 8) {
                            toast.error("Ошибка регистрации. Длина пароля должна быть больше 8 символов", {
                                style: {
                                    backgroundColor: 'grey',
                                    color: "white"
                                }
                            })
                        }
                        else {
                            toast.error("Ошибка регистрации. Проверьте правильность введенных данных", {
                                style: {
                                    backgroundColor: 'grey',
                                    color: "white"
                                }
                            })
                        }
                    }
                    else {
                        toast.error("Ошибка регистрации", {
                            style: {
                                backgroundColor: 'grey',
                                color: "white"
                            }
                        })
                    }
                })
            }
            
            else {
                toast.error("Пароли не совпадают!", {
                    style: {
                        backgroundColor: 'grey',
                        color: "white"
                    }
                })
            };
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
