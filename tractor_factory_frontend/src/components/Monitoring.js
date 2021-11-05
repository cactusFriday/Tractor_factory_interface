import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar2.js';
import './Monitoring.css';
import { Component } from 'react';
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
                  <tr style={{ backgroundColor: '#09AC54' }}>
                    <td style={{ paddingBottom: '6.3%', height: '0', backgroundColor: '#E6E8EB' }}></td>
                    <td style={{ width: '7%' }}> </td>
                    <td></td>
                    <td></td>
                    <td style={{ backgroundColor: '#FFAE50' }}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ backgroundColor: '#FFAE50' }}></td>
                    <td></td>
                    <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                  </tr>
                  <tr style={{ backgroundColor: '#09AC54' }}>
                    <td style={{ paddingBottom: '6.3%', height: '0', backgroundColor: '#E6E8EB' }}></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                  </tr>
                  <tr>
                    <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td style={{ width: '1%', backgroundColor: '#E6E8EB' }}></td>
                  </tr>
                </table>
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