import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import React from "react";
import './Monitoring.css';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import ModalEdit from './ModalEdit.js';
import ModalHistory from './ModalHistory.js';

const url = "https://tractor-factory-interface.herokuapp.com/api/accident/"
const getAccidentHistoryURL = "https://tractor-factory-interface.herokuapp.com/api/accident/";
const postAccidentEditURL = "https://tractor-factory-interface.herokuapp.com/api/accident/history/";
const accidentsClasses = ["Некомплектность на рабочем месте", "Авария на рабчем месте", "Другое"];


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
            history: false
        }
        this.setActiveEdit = this.setActiveEdit.bind(this);
        this.setUnactiveEdit = this.setUnactiveEdit.bind(this);
        this.setActiveHistory = this.setActiveHistory.bind(this);
        this.setUnactiveHistory = this.setUnactiveHistory.bind(this);
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
        // const intervalGet = setInterval(() => this.getAccidents(), 2000);
        // this.setState({ intervalGet })
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
            key: i,
            data: accidentsArray[i]
        });
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
                    data_history: data_history.results[i],
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

        const accidentEditDetails = {
            accident_id: parseInt(this.state.key),
            accident_class: parseInt(trgt.accidentClass.value),
            description: trgt.AccidentDescription.value
        }

        console.log(JSON.stringify(accidentEditDetails));
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
            console.log(res.data);
        })
            .catch((error) => {
                console.log(error);
            });

    };

    render() {
        const accidents_list = typeof this.props.accidents == 'undefined' ? null : this.props.accidents
        return (
            <React.Fragment>
                <table className="Table-Accidents" style={{ borderColor: 'black' }} class="table table-striped table-sm table-bordered">
                    <thead>
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
                                Время фиксации проблемы
                            </th>
                            <th class="text-center">
                                Время устранения проблемы
                            </th>
                            <th class="text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        {accidents_list == null ? <p>Page is Loading ...</p> : accidents_list.map((obj, i) => (
                            <tr>
                                <td>{obj.post}</td>
                                <td>{accidentsClasses[obj.accident_class - 1]}</td>
                                <td>{obj.description}</td>
                                <td>{obj.time_appeared.replace('T', ' ').replace('Z', '')}</td>
                                <td>{obj.time_solved === null ? "Проблема не устранена" : obj.time_solved.replace('T', ' ').replace('Z', '')}</td>
                                <td>
                                    <img src={history} alt="" onClick={() => this.setActiveHistory(i)} />
                                    <img src={edit} alt="" onClick={() => this.setActiveEdit(i)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalEdit isAct={this.state.edit} setUnactive={this.setUnactiveEdit} data={this.state.data} key={this.state.key}
                    handleOnSubmit={this.handleEditSubmit} />
                <ModalHistory isAct={this.state.history} setUnactive={this.setUnactiveHistory} data={this.state.data_history}
                    accidentsClasses={accidentsClasses} />
            </React.Fragment>
        );
    }
}

export default AccidentTable;