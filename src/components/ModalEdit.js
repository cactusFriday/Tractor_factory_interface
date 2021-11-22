import 'bootstrap/dist/css/bootstrap.min.css';
import { React,  useEffect,  useState } from "react";
import './Modal.css';
import close from "../static/icons/close.svg";
import {getPostsToDisplayFromAccident} from './utils/postsUtils';

const ModalEdit = ({isAct, setUnactive, data, key, handleOnSubmit, accidentClasses}) => {
    const showHideClassName = isAct ? "container-fluid modalAccident active" : "container-fluid modalAccident";
    const [accident_key, setAccidentKey] = useState(key);
    const [accident_class, setAccidentClass] = useState(data === null || 'undefined' ? "" : data.accident_class);
    const [time_solved, setTimeSolved] = useState("");
    const [description, setDescription] = useState(data === null || 'undefined' ? "" : data.description);
    const [checkState, setCheckState] = useState(false);
    let middleDescription = data === null || 'undefined' ? "" : data.description;
    let middleAccidentClass = data === null || 'undefined' ? "" : data.accident_class;
    //let middleCheckState = false;

    useEffect(() => {
        setDescription(middleDescription);
        setAccidentClass(middleAccidentClass);
        //setCheckState(false);
        //console.log(checkState);
        //console.log(key);
        //console.log(middleCheckState);
    });

    function dateAccidentSolved() {
        if (checkState === false) {
            // console.log(accident_key);
            //middleCheckState = true;
            setCheckState(true);
            setTimeSolved(new Date().toISOString(true));
            //console.log(new Date());
            //console.log(checkState);
            //console.log(middleCheckState);
        }
        else {
            //middleCheckState = false;
            setCheckState(false);
            setTimeSolved("");
            //console.log(checkState);
            //console.log(middleCheckState);
        }
    };

    function changeDescription(event) {
        middleDescription = event.target.value;
        data.description = event.target.value;
        setDescription(event.target.value);
    };

    function changeAccidentClass(event) {
        middleAccidentClass = event.target.value;
        data.accident_class = event.target.value;
        setAccidentClass(event.target.value);
    }
    
    return (
        <div className={showHideClassName} onClick={setUnactive}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
            <div>
                <img height='32px' style={{float: 'right', cursor: "pointer"}} src={ close } alt="" onClick={setUnactive}/>
            </div>
                <form onSubmit={handleOnSubmit}>
                    <div class="form-group my-3">
                        <label for="PostNumber">Номер поста</label>
                        <input type="text" class="form-control form-control-modal" id="PostNumber" 
                        name="post" 
                        disabled 
                        value={data === null ? "" : String(getPostsToDisplayFromAccident(data))}/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentAppeared">Время фиксирования происшествия</label>
                        <input type="datetime-local" class="form-control form-control-modal" id="AccidentAppeared" 
                        name="timeAppeared" 
                        disabled
                        value={data === null ? "" : data.time_appeared.replace('Z', '').slice(0, 19)}/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentSolved">Время устранения проблемы</label>
                        <input type="text" class="form-control form-control-modal" id="AccidentSolved" 
                        name="AccidentSolved" 
                        disabled
                        value={data === null ? "" : data.time_solved === null ? "Проблема не устранена" : data.time_solved.replace('T', ' ').replace('Z', '').replaceAll('-', '.').slice(0, 19)}/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentClass">Класс происшествия</label>
                        <select class="form-control form-control-modal" id="AccidentClass" 
                        name="accidentClass" 
                        // value={accident_class}
                        // onChange={changeAccidentClass}
                        >
                            {
                                accidentClasses.map((obj, i) => 
                                    <option>{"Класс " + String(obj.number) + ": " + String(obj.name)}</option>
                                )
                            }
                        </select>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentDescription">Описание</label>
                        <textarea class="form-control form-control-modal" id="AccidentDescription" rows="3" 
                        name="description"
                        // value={description}
                        // onChange={changeDescription}
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={setUnactive}>Применить изменения</button>
                </form>
            </div>
        </div>
    )
}

export default ModalEdit; 