import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js';
import './Monitoring.css';
import { Component } from 'react';
import ConveyorTable from './ConveyorTable.js';
import Menu from './Menu.js';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import arrow_forward from '../static/icons/arrow_forward.svg';
import sensors from '../static/icons/sensors.svg';

class Monitoring extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="App-menu">
          <Menu />
        </div>
        <main className="App-main">
          <div className='App-Monitoring'>
            <h1 style={{ textAlign: 'left', verticalAlign: 'middle', lineHeight: '30px', marginBottom: '30px', fontWeight: '600' }}>Мониторинг</h1>
            <table class="table" style={{ backgroundColor: 'none', fontSize: '18px' }}>
              <tr>
              <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                <img src={ arrow_forward } /></td>
              <td style={{ border: 'none' }}>
                <ConveyorTable />
              </td>
              <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                <img src={arrow_forward} /></td>
                </tr>
                <tr>
                <td style={{ border: 'none' }}></td>
                <td className="Conveyor-State" style={{ border: 'none', textAlign: 'left' }} class="img-responsive">Состояние конвейера: <b>конвейер остановлен</b>
                  <img align="right" src={sensors} /></td>
                </tr>
            </table>
          </div>
          <div className="App-Accidents">
            <h1 style={{ textAlign: 'left', verticalAlign: 'middle', lineHeight: '30px', marginBottom: '30px', fontWeight: '600' }}>Список последних происшествий</h1>
            <table className="Table-Accidents" style={{ borderColor: 'black' }} class="table table-striped table-sm table-bordered">
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
                <tr>
                  <td>0</td>
                  <td>Некомплектность на рабочем месте</td>
                  <td>Брак основной рамы трактора</td>
                  <td>12.10.2021<br />16:20:08</td>
                  <td>12.10.2021<br />16:25:24</td>
                  <td><img src={history} alt="" /> <img src={edit} alt="" /></td>
                </tr>
                <tr>
                  <td >3П</td>
                  <td >Другое</td>
                  <td >Тестирование ПО</td>
                  <td >12.10.2021<br />11:02:26</td>
                  <td >12.10.2021<br />12:38:45</td>
                  <td ><img src={history} alt="" /> <img src={edit} alt="" /></td>
                </tr>
                <tr>
                  <td >2, 3Л</td>
                  <td >Авария на рабочем месте</td>
                  <td ></td>
                  <td >12.10.2021<br />16:20:08</td>
                  <td >12.10.2021<br />16:25:24</td>
                  <td ><img src={history} alt="" /> <img src={edit} alt="" /></td>
                </tr>
                <tr>
                  <td >0</td>
                  <td >Некомплектность на рабочем месте</td>
                  <td >Брак основной рамы трактора</td>
                  <td >12.10.2021<br />16:20:08</td>
                  <td >12.10.2021<br />16:25:24</td>
                  <td ><img src={history} alt="" /> <img src={edit} alt="" /></td>
                </tr>
                <tr>
                  <td >3П</td>
                  <td >Другое</td>
                  <td >Тестирование ПО</td>
                  <td >12.10.2021<br />11:02:26</td>
                  <td >12.10.2021<br />12:38:45</td>
                  <td ><img src={history} alt="" /> <img src={edit} alt="" /></td>
                </tr>
                <tr>
                  <td >2, 3Л</td>
                  <td >Авария на рабочем месте</td>
                  <td ></td>
                  <td >12.10.2021<br />16:20:08</td>
                  <td >12.10.2021<br />16:25:24</td>
                  <td ><img src={history} alt="" /> <img src={edit} alt="" /></td>
                </tr>

              </tbody>
            </table>
          </div>
        </main>
        <footer></footer>
      </div>
    );
  }
}
export default Monitoring;