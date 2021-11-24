import 'bootstrap/dist/css/bootstrap.min.css';
import './AccidentTable.css'
import axios from 'axios';
import { Component } from 'react';
import React from "react";
import './Monitoring.css';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import sort from '../static/icons/sort.svg';
import filter from '../static/icons/filter.svg';
import cross from '../static/icons/cross.svg';
import ModalEdit from './ModalEdit.js';
import ModalHistory from './ModalHistory.js';
import { getPostsToDisplayFromAccident } from './utils/postsUtils';
import toast, { Toaster } from 'react-hot-toast';

import { Dropdown, Form, Button, Col, Row } from 'react-bootstrap';

const url = "https://tractor-factory-interface.herokuapp.com/api/accident/"
// const url = "http://localhost:8000/api/accident/"
const getAccidentHistoryURL = "https://tractor-factory-interface.herokuapp.com/api/accident/";
const postAccidentEditURL = "https://tractor-factory-interface.herokuapp.com/api/accident/history/";
// const accidentsClasses = ["Некомплектность на рабочем месте", "Авария на рабчем месте", "Другое"];


class AccidentTable extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            accidents: null,
            data: null,
            data_history: null,
            key: null,
            edit: false,
            history: false,

            filterClass: "Класс: Не установлен",
            filterPost: null,
        }
        this.setActiveEdit = this.setActiveEdit.bind(this);
        this.setUnactiveEdit = this.setUnactiveEdit.bind(this);
        this.setActiveHistory = this.setActiveHistory.bind(this);
        this.setUnactiveHistory = this.setUnactiveHistory.bind(this);
        this.getFilterInputs = this.getFilterInputs.bind(this);
    };

    componentDidMount() {
        fetch(url)
            .then(res => res.json())
            .then(accidents => {
                // console.log(accidents);
                this.setState({
                    loading: false,
                    accidents: accidents,
                })
            });
    };

    componentWillUnmount() {
        clearInterval(this.state.intervalGet);
    }

    // async getAccidents() {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     this.setState({
    //         loading: false,
    //         accidents: data
    //     });
    // }

    setActiveEdit(i) {
        //console.log(i);
        var accidentsArray = Object.values(this.state.accidents.results);
        this.setState({
            edit: true,
            key: -20,
            data: accidentsArray.find(obj => parseInt(obj.id) === parseInt(i)),
            // data: accidentsArray[accidentsArray.length - i]
        });
        console.log("OBJECT ID IN EDIT", i);
        console.log("THIS STATE DATA IN EDIT", this.state.data);
    };

    setUnactiveEdit = () => {
        this.setState({
            edit: false
        });
    };

    setActiveHistory(i) {
        fetch(getAccidentHistoryURL)
            .then(res => res.json())
            .then(data_history => {
                //var length = data_history.results[i].accident_history.length;
                //console.log(data_history.results[i].accident_history);
                //console.log(data_history.results[i].accident_history.length);
                this.setState({
                    loading: false,
                    history: true,
                    key: i,
                    //history_length: length,
                    data_history: data_history.results.find(obj => parseInt(obj.id) === parseInt(i)),
                })
            })
            .catch((error) => {
                toast.error("Ошибка получения истории", {
                    style: {
                        backgroundColor: 'grey',
                        color: "white"
                    }
                })
            });
    };

    setUnactiveHistory = () => {
        this.setState({
            history: false
        });
    }

    handleEditSubmit = (e) => {
        e.preventDefault();
        let trgt = e.target;
        // let accident_class = this.props.accidentClasses[trgt.accidentClass.selectedIndex].number;
        const accidentEditDetails = {
            // accident_id: parseInt(this.state.key),
            accident_id: parseInt(this.state.data.id),
            accident_class: parseInt(this.props.accidentClasses[trgt.accidentClass.selectedIndex].number),
            description: trgt.AccidentDescription.value
        }

        // console.log(JSON.stringify(accidentEditDetails));
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.defaults.withCredentials = true;


        axios.post(postAccidentEditURL, JSON.stringify(accidentEditDetails), {
            headers: {
                'Authorization': `Token ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => {
            console.log(res);
            toast.success("Изменения в инциденте успешно сохранены", {
                style: {
                    backgroundColor: 'grey',
                    color: "white"
                }
            })
        })
        .catch((error) => {
            if (error.response.status === 403) {
                toast.error("Ошибка отправки. Вы не авторизованы", {
                    style: {
                        backgroundColor: 'grey',
                        color: "white"
                    }
                })
            }
            else {
                toast.error("Ошибка отправки на сервер", {
                    style: {
                        backgroundColor: 'grey',
                        color: "white"
                    }
                })
            }
            console.log(error);
        });
        
    };

    getFilterInputs() {
        /* Получаем введенные в поля фильтрации значения */
        /*
        TODO:   4. Сделать сортировку по датам
                    4.1. Функция переключатель для трех состояний стрелок (1 - вверх, 2 - вниз, 3 - отмена)
                    4.2. Сортировать наверное надо на фронте, чтобы не было задержек
                    4.3. Проверить правильно ли кладутся в хендлеры АйДишники инцидентов после сортировок
                5. Не забыть поменять урл!!!!!!
        */
        let dateAppearedVals = [
            document.getElementById("DateAppearedPickerStart").value,
            document.getElementById("DateAppearedPickerEnd").value,
        ]
        let dateSolvedVals = [
            document.getElementById("DateSolvedPickerStart").value,
            document.getElementById("DateSolvedPickerEnd").value,
        ]
        let filters = {
            "accident_class": document.getElementById("selectAccidentFilter").selectedIndex,
            "time_appeared": dateAppearedVals,
            "time_solved": dateSolvedVals,
        }
        this.props.changeUrlOnFilter(filters);
    }


    render() {
        const accidents_list = typeof this.props.accidents == 'undefined' ? null : this.props.accidents;
        console.log(accidents_list);
        const accidentClasses = this.props.accidentClasses;
        // console.log(accidentClasses[0]);
        // console.log(accidents_list);
        return (
            <React.Fragment>
                <div style={{height: '40vh', overflowY: 'auto'}}>

                <table style={{ borderColor: 'black' }} className="table table-striped table-sm table-bordered Table-Accidents">
                    <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">
                                <Form.Select id={"selectAccidentFilter"}>
                                    <option>Класс не установлен</option>
                                    {accidentClasses.map((obj, i) => 
                                        <option>
                                            {"Класс " + String(obj.number) + ": " + String(obj.name)}
                                        </option>
                                    )}
                                </Form.Select>
                            </th>
                            <th class="text-center"></th>
                            <th class="text-center">
                                <div className="filter-date-picker">
                                    <div>
                                        <div>От</div>
                                        <Form.Control type="date" id={"DateAppearedPickerStart"}/>
                                    </div>
                                    <div>
                                        <div>До</div>
                                        <Form.Control type="date" id={"DateAppearedPickerEnd"}/>
                                    </div>
                                </div>
                            </th>
                            <th class="text-center">
                                <div className="filter-date-picker">
                                    <div>
                                        <div>От</div>
                                        <Form.Control type="date" id={"DateSolvedPickerStart"}/>
                                    </div>
                                    <div>
                                        <div>До</div>
                                        <Form.Control type="date" id={"DateSolvedPickerEnd"}/>
                                    </div>
                                </div>
                            </th>
                            <th class="text-center">
                                <div className="filter-icons">
                                    <div className="filter-icons__elem" onClick={this.getFilterInputs}><img src={filter}></img></div>
                                    <div className="filter-icons__elem" onClick={this.props.clearFilter}><img src={cross}></img></div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th class="text-center">
                                Номер поста
                            </th>
                            <th class="text-center">
                                Тип происшествия
                            </th>
                            <th class="text-center">
                                Описание
                            </th>
                            <th class="text-center">
                                <div className="sort-container">
                                    <div>Время фиксации проблемы</div>
                                </div>
                            </th>
                            <th class="text-center">
                                <div className="sort-container">
                                    <div>Время устранения проблемы</div>
                                </div>
                            </th>
                            <th class="text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        {accidents_list == null ? 
                            <tr><td colSpan={6}><p>Данные загружаются</p></td></tr> : 
                            accidents_list.length == 0 ? 
                                <tr><td colSpan={6}><div className="container-fluid"><p>Записи не найдены</p></div></td></tr> :
                                accidents_list.map((obj, i) => (
                                    <tr>
                                        <td>{getPostsToDisplayFromAccident(obj)}</td>
                                        <td>{typeof accidentClasses[obj.accident_class - 1] == 'undefined' ? 
                                            "" : 
                                            accidentClasses[obj.accident_class - 1].name.includes('Тип') ? 
                                                accidentClasses[obj.accident_class - 1].name.replace('Тип ', '').charAt(0).toUpperCase() + accidentClasses[obj.accident_class - 1].name.replace('Тип ', '').slice(1) :
                                                accidentClasses[obj.accident_class - 1].name}</td>
                                        <td>{obj.description}</td>
                                        <td>{obj.time_appeared.replace('T', ' ').replace('Z', '').replaceAll('-', '.').slice(0, 19)}</td>
                                        <td>{obj.time_solved === null ? "Проблема не устранена" : obj.time_solved.replace('T', ' ').replace('Z', '').replaceAll('-', '.').slice(0, 19)}</td>
                                        <td style={{position:'sticky', right:'0px'}}>
                                            <img src={history} alt="" onClick={() => this.setActiveHistory(obj.id)} />
                                            <img src={edit} alt="" onClick={() => this.setActiveEdit(obj.id)} />
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
                <ModalEdit isAct={this.state.edit} setUnactive={this.setUnactiveEdit} data={this.state.data} key={this.state.key}
                    handleOnSubmit={this.handleEditSubmit} accidentClasses={accidentClasses}/>
                <ModalHistory isAct={this.state.history} setUnactive={this.setUnactiveHistory} data={this.state.data_history}
                    accidentsClasses={accidentClasses} />
                <Toaster position='bottom-right'/>
                </div>
            </React.Fragment>
        );
    }
}

export default AccidentTable;
