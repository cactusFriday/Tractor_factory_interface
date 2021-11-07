import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import React from "react";
import Modal from './Modal.js';
import './Monitoring.css';
import './ConveyorTable.css';

const url = "https://tractor-factory-interface.herokuapp.com/api/conveyor-state/"


const ConveyorTable = ({handleOnSubmit}) => {
// export default function ConveyorTable() {
    const [answer, setAnswer] = useState(null);
    const [isActiveModal, setActive] = useState(false);
    const [post, setPost] = useState(null);

    const getAnswer = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setAnswer(data);
    };

    useEffect(() => {
        const timer = setInterval(getAnswer, 2000);
        return () => clearInterval(timer);
    }, []);

    function onTdClick(i) {
        setPost(i);
        setActive(true);
    }

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
                                            return (<td></td>)
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
                                            return (<td></td>)
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
                <td>14</td>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
            </tr>
        </table>
        <Modal isActive={isActiveModal} setActive={setActive} post={post} handleOnSubmit={handleOnSubmit}/>
        </React.Fragment>
    )
}

export default ConveyorTable;