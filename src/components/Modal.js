import React, { forwardRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';


const Modal = ({isActive, setActive, post}) => {
    return (
        <div className={isActive ? "modalAccident active" : "modalAccident"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <form>
                    <div class="form-group my-3">
                        <label for="PostNumber">Номер поста</label>
                        <input type="text" class="form-control" id="PostNumber" aria-describedby="emailHelp" disabled placeholder={post}/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentAppeared">Время фиксирования происшествия</label>
                        <input type="datetime-local" class="form-control" id="AccidentAppeared" placeholder="None"/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentSolved">Время решения происшествия</label>
                        <input type="datetime-local" class="form-control" id="AccidentSolved" placeholder="None"/>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentClass">Класс происшествия</label>
                        <select class="form-control" id="AccidentClass">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div class="form-group my-3">
                        <label for="AccidentDescription">Описание</label>
                        <textarea class="form-control" id="AccidentDescription" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;