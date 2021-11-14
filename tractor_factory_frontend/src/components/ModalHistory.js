import 'bootstrap/dist/css/bootstrap.min.css';
import { React } from "react";
import './ModalHistory.css';
import close from "../static/icons/close.svg";


const ModalHistory = ({isAct, setUnactive, data, accidentsClasses}) => {
    const showHideClassName = isAct ? "modalAccident active" : "modalAccident";
    return (
        <div className={showHideClassName} onClick={setUnactive} style={{position: 'fixed', overflowY: 'scroll'}}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
            <div>
                <img height='32px' style={{marginTop: '10px', float: 'right'}} src={ close } alt="" onClick={setUnactive}/>
            </div>
                <div class="table-responsive" style={{height: '80vh', overflowY: 'auto'}}>
                    <table class="table table-bordered table-hover table-sm">
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
                                Время изменения
                            </th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                        <th colspan="4"><h5 style={{textAlign: 'center', color: 'Highlight'}}><b>Текущее состояние</b></h5></th>
                            <tr>
                                <td>{data === null ? "" : data.post}</td>
                                <td>{data === null ? "" : accidentsClasses[data.accident_class - 1]}</td>
                                <td rows="3">{data === null ? "" : data.description}</td>
                                <td>{data === null ? "" : data.time_appeared.replace('T', ' ').replace('Z', '').replaceAll('-', '.').slice(0, 19)}</td> 
                            </tr>
                        <th colspan="5"><h5 style={{textAlign: 'center', color: 'Highlight'}}><b>История изменений</b></h5></th>
                        <tr></tr>
                        {data === null ? <th colspan="5" style={{textAlign: 'center'}}><h6>Нет истории изменений...</h6></th> 
                        : (data.accident_history === null ?  <th colspan="5" style={{textAlign: 'center'}}><h6>Нет истории изменений...</h6></th> 
                         : data.accident_history.map((obj, i) => (
                            <tr>
                                <td>{data.post}</td>
                                <td>{accidentsClasses[obj.accident_class - 1]}</td>
                                <td>{obj.description}</td>
                                <td>{obj.time_changed.replace('T', ' ').replace('Z', '').replaceAll('-', '.').slice(0, 19)}</td>
                            </tr>
                        )))}      
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default ModalHistory;