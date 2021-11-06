import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import { Component, useEffect, useState } from 'react';
import React from "react";
import './Monitoring.css';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';

const url = "https://tractor-factory-interface.herokuapp.com/api/accident/"


class AccidentTable extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            accidents: null,
        }
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

    render() {
        const accidents_list = typeof this.props.accidents == 'undefined' ? null : this.props.accidents
        return (
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
                        <td>{obj.accident_class}</td>
                        <td>{obj.description}</td>
                        <td>{obj.time_appeared}</td>
                        <td>{obj.time_solved}</td>
                        <td><img src={history} alt="" /> <img src={edit} alt="" /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default AccidentTable;