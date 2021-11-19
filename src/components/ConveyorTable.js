import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import React from "react";
import Modal from './Modal.js';
import './Monitoring.css';
import './ConveyorTable.css';
import { getPostsBlockFromPost } from './utils/postsUtils'
import toast, { Toaster } from 'react-hot-toast';

const getConvStateURL = "https://tractor-factory-interface.herokuapp.com/api/conveyor-state/"


const ConveyorTable = ({accidentClasses}) => {
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
        let posts_block = getPostsBlockFromPost(parseInt(i));
        // const retrieveAccidentURL = `http://localhost:8000/api/accident/?posts_block=${posts_block}&last=True`;
        const retrieveAccidentURL = `https://tractor-factory-interface.herokuapp.com/api/accident/?posts_block=${posts_block}&last=True`;
        fetch(retrieveAccidentURL)
        .then(res => res.json())
        .then(accidents => {
            const last_accident = accidents.results[0];
            setAccident(last_accident);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Не удалось получить данные инцидента", {
                style: {
                    backgroundColor: 'grey',
                    color: "white"
                }
            })
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
                                                key={obj.post_number} 
                                                class={obj.buttons_set[0].status_block} 
                                                onClick={obj.buttons_set[0].status_block==='error' ? () => onTdClick(obj.post_number) : null}/>)
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
                                                key={obj.post_number}
                                                class={obj.buttons_set[0].status_block} 
                                                onClick={obj.buttons_set[0].status_block==='error' ? () => onTdClick(obj.post_number) : null}/>)
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
        <Modal 
            isActive={isActiveModal} 
            setActive={setActive} 
            accident={accident} 
            setError={setError} 
            error={error}
            accidentClasses={accidentClasses}
        />
        <Toaster position="bottom-right"/>
        </React.Fragment>
    )
}

export default ConveyorTable;