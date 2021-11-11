import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from "react";
import Modal from './Modal.js';
import './Monitoring.css';
import './ConveyorTable.css';

const getConvStateURL = "https://tractor-factory-interface.herokuapp.com/api/conveyor-state/"

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const ConveyorTable = () => {
    const [answer, setAnswer] = useState(null);
    const [isActiveModal, setActive] = useState(false);
    const [accident, setAccident] = useState(null);
    const [error, setError] = useState(null);

    const getAnswer = async () => {
        const res = await fetch(getConvStateURL);
        const data = await res.json();
        setAnswer(data);
    };

    useEffect(() => {
        const timer = setInterval(getAnswer, 2000);
        return () => clearInterval(timer);
    }, []);

    function onTdClick(i) {
        /* Функция обработки нажатия на красную ячейку таблицы. 
        Обновляет состояние поста номером, нажатой ячейки. Выставляет булеву active в true.
        Получает информацию о последнем зафиксированном происшествии на этом посту.
        После установки true, компонент перерендеривается и вызывается модальное окно.
        в которое передается вся информация о полученном происшествии. */
        const retrieveAccidentURL = `http://localhost:8000/api/accident/?post=${i}&last=True`;
        fetch(retrieveAccidentURL)
        .then(res => res.json())
        .then(accidents => {
            const last_accident = accidents.results[0];
            setAccident(last_accident);
        });
        setActive(true);
        setError(null);
    };

    return (
        <React.Fragment>
        <table className="App-Conveyor" style={{ backgroundColor: '#E6E8EB', fontSize: '18px' }}>
            <tr>
                <td style={{ width: '1%' }}></td>
                <td style={{ width: '7%' }}>0</td>
                <td style={{ width: '7%' }}>1</td>
                <td style={{ width: '7%' }}>2</td>
                <td style={{ width: '7%' }}>3</td>
                <td style={{ width: '7%' }}>4</td>
                <td style={{ width: '7%' }}>5</td>
                <td style={{ width: '7%' }}>6</td>
                <td style={{ width: '7%' }}>7</td>
                <td style={{ width: '7%' }}>8</td>
                <td style={{ width: '7%' }}>9</td>
                <td style={{ width: '7%' }}>10</td>
                <td style={{ width: '7%' }}>11</td>
                <td style={{ width: '7%' }}>12</td>
                <td style={{ width: '7%' }}>13</td>
                <td style={{ width: '1%' }}></td>
            </tr>
                {
                    function () {
                        return (
                            <React.Fragment>
                                <tr style={{ backgroundColor: '#09AC54' }}>
                                <td style={{ paddingBottom: '6.3%', height: '0', backgroundColor: '#E6E8EB' }}></td>
                                {
                                    function () {
                                        if (answer === null) {
                                            return (<React.Fragment><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/></React.Fragment>)
                                        }
                                        else {
                                            return (
                                                answer.slice(0, answer.length/2).map((obj, i) => 
                                                <td 
                                                key={obj.post} 
                                                class={obj.status} 
                                                onClick={obj.status==='error' ? () => onTdClick(obj.post) : null}/>)
                                                )
                                        }
                                    }()
                                }
                                <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                                </tr>
                                <tr style={{ backgroundColor: '#09AC54' }}>
                                <td style={{ paddingBottom: '6.3%', height: '0', backgroundColor: '#E6E8EB' }}></td>
                                {
                                    function () {
                                        if (answer === null) {
                                            return (<React.Fragment><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/><td/></React.Fragment>)
                                        }
                                        else {
                                            return (
                                                answer.slice(answer.length/2, answer.length).map((obj, i) => 
                                                <td 
                                                key={obj.post}
                                                class={obj.status} 
                                                onClick={obj.status==='error' ? () => onTdClick(obj.post) : null}/>)
                                                )
                                        }
                                    }()
                                }
                                <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                                </tr>
                            </React.Fragment>
                        )
                    }()
                }
            <tr>
                <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                <td>0</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
            </tr>
        </table>
        <Modal isActive={isActiveModal} setActive={setActive} accident={accident} setError={setError} error={error}/>
        </React.Fragment>
    )
}

export default ConveyorTable;