import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import { Component, useEffect, useState, setState } from 'react';
import React from "react";
import './Monitoring.css';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import ModalEdit from './ModalEdit.js';
import ModalHistory from './ModalHistory.js';

const url = "https://tractor-factory-interface.herokuapp.com/api/accident/";
const accidentsClasses = ["Некомплектность на рабочем месте", "Авария на рабчем месте", "Другое"];

class AccidentTable extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            accidents: null,
            data: null, 
            key: null,
            edit: false,
            history: false
        };
        this.setActiveEdit = this.setActiveEdit.bind(this);
        this.setUnactiveEdit = this.setUnactiveEdit.bind(this);
        this.setActiveHistory = this.setActiveHistory.bind(this);
        this.setUnactiveHistory = this.setUnactiveHistory.bind(this);
    };

    componentDidMount() {
        fetch(url)
            .then(res => res.json())
            .then(accidents => {
                //console.log(accidents);
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
        var accidentsArray = Object.values(this.state.accidents.results);
        this.setState({
            history: true, 
            key: i, 
            data: accidentsArray[i]
        });
    };

    setUnactiveHistory = () => {
        this.setState({
            history: false
        });
    }


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
                                <td>{obj.time_appeared}</td>
                                <td>{obj.time_solved === null ? "Проблема не устранена" : obj.time_solved.replace('T', ' ').replace('Z', '')}</td>
                                <td>
                                    <img src={history} alt="" onClick={() => this.setActiveHistory(i)}/>
                                    <img src={edit} alt="" onClick={() => this.setActiveEdit(i)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalEdit isAct={this.state.edit} setUnactive={this.setUnactiveEdit} data={this.state.data}
                    handleOnSubmit={this.handleOnSubmit} />
                <ModalHistory isAct={this.state.history} setUnactive={this.setUnactiveHistory} data={this.state.data}
                    accidentsClasses={accidentsClasses}
                    handleOnSubmit={this.handleOnSubmit} />
            </React.Fragment>
        );
    }
}

export default AccidentTable;
