import React, { forwardRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import close from "../static/icons/close.svg";


const Modal = ({isActive, setActive, post, handleOnSubmit}) => {
    return (
        <div className={isActive ? "modalAccident active" : "modalAccident"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
            <div>
                <img height='32px' style={{marginTop: '10px', float: 'right'}} src={ close } alt="" onClick={() => setActive(false)}/>
            </div>
                <form onSubmit={handleOnSubmit}>
                    <div class="form-group my-3">
                        <label for="PostNumber">Номер поста</label>
                        <input type="text" class="form-control" id="PostNumber" name="post" disabled placeholder={post}/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentAppeared">Время фиксирования происшествия</label>
                        <input type="datetime-local" class="form-control" id="AccidentAppeared" name="timeAppeared"/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentSolved">Время решения происшествия</label>
                        <input 
                        type="datetime-local" 
                        class="form-control" 
                        id="AccidentSolved" 
                        name="timeSolved"/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentClass">Класс происшествия</label>
                        <select class="form-control" id="AccidentClass" name="accidentClass">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentDescription">Описание</label>
                        <textarea class="form-control" id="AccidentDescription" rows="3" name="description"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;