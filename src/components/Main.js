import 'bootstrap/dist/css/bootstrap.min.css';
import './Monitoring.css';
import './style.css'
import Menu from './Menu.js';
import Navbar from './Navbar.js';
import tractor from '../static/images/main.png';
import React, { Component } from 'react';


class Main extends Component {

  render() {
    return (
      <React.Fragment>
        <body>
          <Navbar />
          <div>
            <div>
              <Menu />
            </div>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
              <h1>Главная</h1>
              <p>Добро пожаловать в систему мониторинга главного конвейера <a href="https://kirovets-ptz.com/">Петербургского тракторного завода</a>!</p>
              {/* <p>Текущее время сервера: 00:00:00 дд.мм.гггг</p> */}
              <img src={tractor}/>
              <p>Проект создан <b>Командой 10</b> в рамках образовательной программы CROCBoostcamp в 2021 г.</p>
            </main>
          </div>
        </body>
        <footer></footer>
      </React.Fragment>
    );
  }
}
export default Main;
