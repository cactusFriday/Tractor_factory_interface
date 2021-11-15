import axios from 'axios';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js'
import './ConveyorConfig.css'


const getConfigAPIUrl = "https://tractor-factory-interface.herokuapp.com/api/conveyor-state/buttons-posts/";
const updateConfigAPIUrl = "https://tractor-factory-interface.herokuapp.com/api/conveyor-state/buttons-posts/update-buttons-configuration/";

// const getConfigAPIUrl = "http://localhost:8000/api/conveyor/config";


class ConveyorConfig extends Component {
    constructor() {
        super();

        this.state = {
            isError: false,
        }

        // Привязка контекста к методам
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
        this.checkOnError = this.checkOnError.bind(this);
        
        // Определеяем заголовки запросов
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        axios.defaults.withCredentials = true;
    };

    componentDidMount() {
        /* Работает при монтировании компонента 1 раз. Подгружает текущую конфигурацию и выставляет в поля */
        this.getConfig();
        this.interval = setInterval(this.checkOnError, 2000);
    }

    componentWillUnmount() {
        /* Очищаем интервал по размонтировании компонента */
        clearInterval(this.interval);
    }

    getConfig() {
        /* Получает конфиг по запросу. В случае ошибки, выводит ошибку, ставит isError в true. */
        axios.get(getConfigAPIUrl)
        .then(res => {
            // В случае получения результата, если выведена ошибка, удаляем её со страницы
            let errorHeader = document.getElementById("error-header");
            if (errorHeader !== null) {
                errorHeader.parentNode.removeChild(errorHeader);
            }
            
            this.fillInputsWithConfig(res.data.results);

            this.saveToLocalStorage(res.data.results);
            this.setState({
                isError: false
            });
        })
        .catch((error) => {
            this.setState({
                isError: true,
            });
            let errorHeader = document.getElementById("error-header");
            if (errorHeader === null) {
                let container = document.getElementById('btns-container');
                container.insertAdjacentHTML('afterend', '<h3 id="error-header" style="color: red; margin-top:35px">Ошибка во время получения конфигурации</h3>');
            };
        })
    }
    
    postConfig(config) {
        axios.post(updateConfigAPIUrl, JSON.stringify(config), {
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    saveToLocalStorage(config) {
        let localStorageConfig = localStorage.getItem('posts-config');
        if (localStorageConfig !==  null) {
            localStorage.removeItem('posts-config');
        }
        localStorage.setItem('posts-config', JSON.stringify(config));
    }

    onSubmitClick() {
        /* Метод обработки кнопки Сохранение. Собирает значения из всех инпутов и отправляет */
        let inputs = document.getElementsByTagName('input');
        let postsObj = {};
        for (let i = 0; i < inputs.length; i++) {
            postsObj[i] = {}
            postsObj[i]["post"] = i;
            postsObj[i]["block"] = inputs[i].value;
        }
        // {{post: 1, block: 0}, {}, {}....}
        let convertedConfig = this.convertPostsNumbersFromInputs(postsObj);

        this.saveToLocalStorage(convertedConfig);
        this.postConfig(convertedConfig);
    }

    onResetClick() {
        /* Метод очистки полей ввода */
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }

    convertPostsNumbersFromInputs(inputs) {
        /* Записи с инпутов конвертировать в блоки по постам */
        // inputs: {{post: 1, block: 0}, {}, {}....}
        let inputsLen = Object.keys(inputs).length;
        let convertedConfig = {};
        let passedKeys = [];
        for (let key in inputs) {
            let curBlock = String(inputs[key].block)
            if (passedKeys.indexOf(curBlock) < 0) {
                convertedConfig[curBlock] = {
                    "buttons_block_number": curBlock,
                    "posts": [ {"post_number": parseInt(key)}, ],
                }              //Если блока нет - создаем объект под ключем блока
            }
            else {
                convertedConfig[curBlock].posts.push({"post_number": parseInt(key)});
            }
            passedKeys.push(curBlock);       // кладем уже рассмотренный блок кнопок
        }

        let result = [];
        for (let key in convertedConfig) {
            result.push(convertedConfig[key]);
        }
        console.log(result);
        return result
    }

    fillInputsWithConfig(config) {
        /* Заполняет инпуты конфигурацией */
        let inputs = document.getElementsByTagName('input');
        let inputsArray = Array.prototype.slice.call(inputs);
        // console.log(config);
        // console.log(inputsArray);
        for (let i = 0; i < config.length; i++) {
            let curVal = config[i].buttons_block_number;
            let curPosts = config[i].posts;
            for(let j = 0; j < curPosts.length; j++) {
                inputsArray[curPosts[j].post_number].value = curVal;
            }
        }
    }

    checkOnError() {
        /* Метод, периодически проверяющий есть ли ошибка получения конфига.
        Если есть - шлет запрос. Если нет - очищает интервал*/
        if (this.state.isError === true) {
            this.getConfig();
        }
        else {
            clearInterval(this.interval);
        }
    }

    render () {

        return (
            <div className="App">
                <header className="App-header">
                    <Navbar />
                </header>
                <main className="App-main">
                    <div class="container">
                        <div class="table-responsive">
                        <table class="table table-bordered table-config">
                            <thead>
                                <tr>
                                <th scope="col">Пост</th>
                                <th scope="col">0</th>
                                <th scope="col">1</th>
                                <th scope="col">2</th>
                                <th scope="col">3</th>
                                <th scope="col">4</th>
                                <th scope="col">5</th>
                                <th scope="col">6</th>
                                <th scope="col">7</th>
                                <th scope="col">8</th>
                                <th scope="col">9</th>
                                <th scope="col">10</th>
                                <th scope="col">11</th>
                                <th scope="col">12</th>
                                <th scope="col">13</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Правая сторона</th>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                </tr>
                                <tr>
                                    <th scope="row">Левая сторона</th>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                    <td><input type="text" class="form-control form-control__config"></input></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div class="container" id="btns-container">
                            <button type='button' class="btn btn-primary btn-config" onClick={this.onSubmitClick}>Сохранение</button>
                            <button type='button' class="btn btn-dark btn-config btn-config-dark" onClick={this.onResetClick}>Сброс</button>
                        </div>
                    </div>
                </main>
                <footer></footer>
            </div>
        )
    }
}

export default ConveyorConfig;