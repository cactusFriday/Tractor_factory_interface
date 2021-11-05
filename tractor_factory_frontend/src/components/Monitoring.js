import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar.js';
import './Monitoring.css';
import { Component } from 'react';
import Menu from './Menu.js';
import ConveyorTable from './ConveyorTable.js';
import arrow_forward from '../static/icons/arrow_forward.svg';
import sensors from '../static/icons/sensors.svg';
import history from '../static/icons/history.svg';
import edit from '../static/icons/edit.svg';
import './style.css'

class Monitoring extends Component {
  render() {
    return (
      <div>
        <body>
          <Navbar />
          <div class="row">
            <div>
              <Menu />
            </div>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
              <h1>Мониторинг</h1>
              <table class="table" style={{ backgroundColor: 'none', fontSize: '18px', marginTop: '10px' }}>
                <tr>
                  <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                    <img src={arrow_forward} alt="" /></td>
                  <td style={{ border: 'none' }}>
                    <ConveyorTable />
                  </td>
                  <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                    <img src={arrow_forward} alt="" /></td>
                </tr>
                <td style={{ border: 'none' }}></td>
                <td className="Conveyor-State" style={{ border: 'none', textAlign: 'left', paddingTop: '30px'}} class="img-responsive">Состояние конвейера: <b>конвейер остановлен</b>
                  <img align="right" src={sensors} /></td>
              </table>
              <h1>Список последних происшествий</h1>
              <table class="table table-striped table-sm table-bordered">
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
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}><input></input>0</td>
                    <td style={{ textAlign: 'center' }}>Некомплектность на рабочем месте</td>
                    <td style={{ textAlign: 'center' }}>Брак основной рамы трактора</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:20:08</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:25:24</td>
                    <td style={{ textAlign: 'center' }}><img src={history} alt="" /> <img src={edit} alt="" /></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>3П</td>
                    <td style={{ textAlign: 'center' }}>Другое</td>
                    <td style={{ textAlign: 'center' }}>Тестирование ПО</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />11:02:26</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />12:38:45</td>
                    <td style={{ textAlign: 'center' }}><img src={history} alt="" /> <img src={edit} alt="" /></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>2, 3Л</td>
                    <td style={{ textAlign: 'center' }}>Авария на рабочем месте</td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:20:08</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:25:24</td>
                    <td style={{ textAlign: 'center' }}><img src={history} alt="" /> <img src={edit} alt="" /></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>0</td>
                    <td style={{ textAlign: 'center' }}>Некомплектность на рабочем месте</td>
                    <td style={{ textAlign: 'center' }}>Брак основной рамы трактора</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:20:08</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:25:24</td>
                    <td style={{ textAlign: 'center' }}><img src={history} alt="" /> <img src={edit} alt="" /></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>3П</td>
                    <td style={{ textAlign: 'center' }}>Другое</td>
                    <td style={{ textAlign: 'center' }}>Тестирование ПО</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />11:02:26</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />12:38:45</td>
                    <td style={{ textAlign: 'center' }}><img src={history} alt="" /> <img src={edit} alt="" /></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>2, 3Л</td>
                    <td style={{ textAlign: 'center' }}>Авария на рабочем месте</td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:20:08</td>
                    <td style={{ textAlign: 'center' }}>12.10.2021<br />16:25:24</td>
                    <td style={{ textAlign: 'center' }}><img src={history} alt="" /> <img src={edit} alt="" /></td>
                  </tr>

                </tbody>
              </table>
            </main>
          </div>
        </body>
        <footer></footer>

      </div>
    );
  }
}
export default Monitoring;