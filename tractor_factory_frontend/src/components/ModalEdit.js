import 'bootstrap/dist/css/bootstrap.min.css';
import { React,  useState } from "react";
import './Modal.css';
import close from "../static/icons/close.svg";

const ModalEdit = ({isAct, setUnactive, data, handleOnSubmit}) => {
    const showHideClassName = isAct ? "modalAccident active" : "modalAccident";
    //const [post, setPost] = useState(data === null ? "" : data.post);
    const [accident_class, setAccidentClass] = useState(data === null ? "" : data.accident_class);
    const [time_appeared, setTimeAppeared] = useState(data === null ? "" : data.time_appeared);
    const [time_solved, setTimeSolved] = useState(data === null ? "" : data.time_solved);
    const [description, setDescription] = useState(data === null ? "" : data.description);

    return (
        <div className={showHideClassName} onClick={setUnactive}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
            <div>
                <img height='32px' style={{float: 'right'}} src={ close } alt="" onClick={setUnactive}/>
            </div>
                <form onSubmit={handleOnSubmit}>
                    <div class="form-group my-3">
                        <label for="PostNumber">Номер поста</label>
                        <input type="text" class="form-control" id="PostNumber" name="post" disabled 
                        value={data === null ? "" : data.post}
                        /*onChange={(e) => setPost(e.target.value)}*//>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentAppeared">Время фиксирования происшествия</label>
                        <input type="datetime-local" class="form-control" id="AccidentAppeared" 
                        name="timeAppeared" 
                        value={data === null ? "" : data.time_appeared.replace('T', ' ').replace('Z', '')}/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentSolved">Время решения происшествия</label>
                        <input 
                        type="datetime-local" 
                        class="form-control" 
                        id="AccidentSolved" 
                        name="timeSolved"
                        value={time_solved === null ? "Проблема не устранена" : time_solved.replace('T', ' ').replace('Z', '')}
                        />
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentClass">Класс происшествия</label>
                        <select class="form-control" id="AccidentClass" name="accidentClass" value={accident_class}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentDescription">Описание</label>
                        <textarea class="form-control" id="AccidentDescription" rows="3" name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Применить изменения</button>
                </form>
            </div>
        </div>
    )
}

export default ModalEdit;
