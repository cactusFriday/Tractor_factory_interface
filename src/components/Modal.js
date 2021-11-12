import React, { Component, forwardRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import close from "../static/icons/close.svg";
import axios from "axios";


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
        const accidentDetails = {
          accident_class: parseInt(trgt.accidentClass.value),
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
    
    render () {
        const isActive = this.props.isActive;
        const setActive = this.props.setActive;
        const accident = this.props.accident;
        let time_appeared = null;
        if (accident !== null) {
            time_appeared = this.props.accident.time_appeared;
            time_appeared = time_appeared.split('.');
            time_appeared.pop();
            time_appeared = time_appeared.join('.');
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
                                value={accident == null ? '' : time_appeared}
                                disabled/>
                            </div>
                            {/* <div class="form-group my-3">
                                <label for="AccidentSolved">Время решения происшествия</label>
                                <input 
                                type="datetime-local" 
                                class="form-control form-control-modal" 
                                id="AccidentSolved" 
                                name="timeSolved"
                                disabled/>
                            </div> */}
                            <div class="form-group my-3">
                                <label for="AccidentClass">Класс происшествия</label>
                                <select class="form-control form-control-modal" id="AccidentClass" name="accidentClass">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div class="form-group my-3">
                                <label for="AccidentDescription">Описание</label>
                                <textarea class="form-control form-control-modal" id="AccidentDescription" rows="3" name="description"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
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