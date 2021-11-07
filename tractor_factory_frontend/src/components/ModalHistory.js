import 'bootstrap/dist/css/bootstrap.min.css';
import { React,  useState } from "react";
import './Modal.css';
import close from "../static/icons/close.svg";


const ModalHistory = ({isAct, setUnactive, data, accidentsClasses, handleOnSubmit}) => {
    const showHideClassName = isAct ? "modalAccident active" : "modalAccident";
    /*const [post, setPost] = useState(data === null ? "" : data.post);
    const [accident_class, setAccidentClass] = useState(data === null ? "" : data.accident_class);
    const [time_appeared, setTimeAppeared] = useState(data === null ? "" : data.time_appeared);
    const [time_solved, setTimeSolved] = useState(data === null ? "" : data.time_solved);
    const [description, setDescription] = useState(data === null ? "" : data.description); 
    const [accident_history, setAccidentHistory] = useState(data === null ? "" : data.accident_history); */ 
    /* const [post, setPost] = useState(data === null ? data.post : data.post);
    const [accident_class, setAccidentClass] = useState(data === null ? data.accident_class : data.accident_class);
    const [time_appeared, setTimeAppeared] = useState(data === null ? data.time_appeared : data.time_appeared);
    const [time_solved, setTimeSolved] = useState(data === null ? data.time_solved : data.time_solved);
    const [description, setDescription] = useState(data === null ? data.description : data.description); 
    const [accident_history, setAccidentHistory] = useState(data === null ? data.accident_history : data.accident_history); */

    return (
        <div className={showHideClassName} onClick={setUnactive} style={{position: 'fixed', overflowY: 'scroll'}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
            <div>
                <img height='32px' style={{marginTop: '10px', float: 'right'}} src={ close } alt="" onClick={setUnactive}/>
            </div>
                <div><table style={{}}>
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
                        <th colspan="5"><h6 style={{textAlign: 'center', color: 'Highlight'}}>Текущее состояние</h6></th>
                            <tr>
                                <td>{data === null ? "" : data.post}</td>
                                <td>{data === null ? "" : accidentsClasses[data.accident_class - 1]}</td>
                                <td rows="3">{data === null ? "" : data.description}</td>
                                <td>{data === null ? "" : data.time_appeared}</td>
                                <td>{data === null ? "" : data.time_solved === null ? "Проблема не устранена" : data.time_solved}</td>  
                            </tr>
                            
                        <th colspan="5"><h6 style={{textAlign: 'center', color: 'Highlight'}}>Историй изменений</h6></th>
                        <tr></tr>
                        <th colspan="5" style={{textAlign: 'center'}}>{data === null ? <h6>Нет истории изменений...</h6> : <h6>Нет истории изменений...</h6>}</th>
                        <tr>
                            <td>{data === null ? "" : data.post}</td>
                            <td>{data === null ? "" : accidentsClasses[data.accident_class - 1]}</td>
                            <td rows="3">{data === null ? "" : data.description}</td>
                            <td>{data === null ? "" : data.time_appeared}</td>
                            <td>{data === null ? "" : data.time_solved === null ? "Проблема не устранена" : data.time_solved}</td> 
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default ModalHistory;