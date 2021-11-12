import React, { Component, forwardRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import close from "../static/icons/close.svg";
import axios from "axios";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";


class Modal extends Component {

    constructor() {
        super();
        this.state = {
            error: '',
        };
    };

    handleOnSubmit = (e) => {
        /* Метод для обработки формы. Получает информацию об инциденте из формы. 
        Отправляет PATCH запрос с обновлением информации об инциденте (регистрация инцидента)*/
        e.preventDefault();
        // trgt - вся форма, лежащая в event
        let trgt = e.target;
        let timeEnd = ":00+00:00";
        let post = parseInt(trgt.post.placeholder);
        let accident_id = this.props.accident.id;
        // Объект для сериализации и PATCH
        let accident_class = this.props.accidentClasses[trgt.accidentClass.selectedIndex].number;
        const accidentDetails = {
          accident_class: parseInt(accident_class),
          description: trgt.description.value
        };
        // Сериализуем, отправляем на сервер, создавая новое происшествие.
        // При получении ответа обновляем состояние новым происшествием.
        // При обновлении состояния компонент рендерится заново, значит,
        // список с актуальными происшествиями, переданный как пропсы в компонент таблицы, будет отрендерен
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.defaults.withCredentials = true;
        const patchAccidentURL = `https://tractor-factory-interface.herokuapp.com/api/accident/${accident_id}/`;

        axios.patch(patchAccidentURL, JSON.stringify(accidentDetails), {
          headers: {
            'Authorization': `Token ${localStorage.token}`,
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
            // закрываем окно в случае ответа
            this.props.setActive(false);
        })
        .catch((error) => {
            this.props.setError("Ошибка во время отправки происшествия");
            // this.props.setError([error.response.status, error.response.statusText]);
        });
    };

    convertTime(accident) {
        let time_appeared = accident.time_appeared == null ? '' : accident.time_appeared.slice(0, 19);
        let time_solved = accident.time_solved == null ? '' : accident.time_solved.slice(0, 19);
        return [time_appeared, time_solved]
    }
    
    render () {
        const isActive = this.props.isActive;
        const setActive = this.props.setActive;
        const accident = this.props.accident;
        const accidentClasses = this.props.accidentClasses;
        let times = null;
        if (accident !== null) {
            times = this.convertTime(accident);
        };
        return (
            <div className={isActive ? "container-fluid modalAccident active" : "container-fluid modalAccident"} onClick={() => setActive(false)}>
                <div className="modal__content container-sm" onClick={e => e.stopPropagation()}>
                <div>
                    <img height='32px' style={{marginTop: '10px', float: 'right', cursor: "pointer"}} src={ close } alt="" onClick={() => setActive(false)}/>
                </div>
                    {
                        accident == null ? 
                        <React.Fragment>
                            <h3>Loading...</h3>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        <form onSubmit={this.handleOnSubmit}>
                            <div class="form-group my-3">
                                <label for="PostNumber">Номер поста</label>
                                <input type="text" class="form-control form-control-modal" id="PostNumber" name="post" disabled placeholder={accident == null ? null : accident.post}/>
                            </div>
                            <div class="form-group my-3">
                                <label for="AccidentAppeared">Время фиксирования происшествия</label>
                                <input 
                                type="datetime-local" 
                                class="form-control form-control-modal" 
                                id="AccidentAppeared" 
                                name="timeAppeared" 
                                value={times[0] == null ? '' : times[0]}
                                disabled/>
                            </div>
                            <div class="form-group my-3">
                                <label for="AccidentSolved">Время решения происшествия</label>
                                <input 
                                type="datetime-local" 
                                class="form-control form-control-modal" 
                                id="AccidentSolved" 
                                name="timeSolved"
                                value={times[1] == null ? '' : times[1]}
                                disabled/>
                            </div>
                            <div class="form-group my-3">
                                <label for="AccidentClass">Класс происшествия</label>
                                <select class="form-control form-control-modal" id="AccidentClass" name="accidentClass">
                                    {
                                        accidentClasses.map((obj, i) => 
                                            <option>{"Класс " + String(obj.number) + ": " + String(obj.name)}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div class="form-group my-3">
                                <label for="AccidentDescription">Описание</label>
                                <textarea class="form-control form-control-modal" id="AccidentDescription" rows="3" name="description"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Подтвердить</button>
                        </form>
                        {this.props.error === 'undefined' || null ? null : <div><p style={{color: "red", fontWeight: "bold"}}>{this.props.error}</p></div>}
                        </React.Fragment>
                    }
                </div>
            </div>
        )
    }
}

export default Modal;