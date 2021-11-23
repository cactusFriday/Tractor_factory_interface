import 'bootstrap/dist/css/bootstrap.min.css';
import './Monitoring.css';
import './style.css'
import Menu from './Menu.js';
import Navbar from './Navbar.js';
import AccidentTable from './AccidentTable.js';
import ConveyorTable from './ConveyorTable.js';
import arrow_forward from '../static/icons/arrow_forward.svg';
import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getConfig } from './utils/configUtils';

let getAcidentURL = 'https://tractor-factory-interface.herokuapp.com/api/accident/';
// let getAcidentURL = 'http://localhost:8000/api/accident/';
const getAcidentClassesURL = 'https://tractor-factory-interface.herokuapp.com/api/accident/classes/';

class Monitoring extends Component {
  constructor() {
    super();
    this.getAccidents = this.getAccidents.bind(this);
    this.state = {
      loading: true,
      accidents: [],
      accidentClasses: [],
    }
  };

  componentDidMount() {
    getConfig();
    fetch(getAcidentURL)
    .then(res => res.json())
    .then(accidents => {
        this.setState({
            accidents: accidents.results,
        });
    })
    .catch((error) => {
      console.log(error);
      toast.error("Ошибка получения списка инцидентов.", {
        style: {
            backgroundColor: 'grey',
            color: "white"
        }
      })
    });
    fetch(getAcidentClassesURL)
    .then(res => res.json())
    .then(accidentClasses => {
        this.setState({
            loading: false,
            accidentClasses: accidentClasses.results,
        });
    });
    // Ставим функцию получения инцидентов на интервал
    this.intervalGetAccidents = setInterval(this.getAccidents, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalGetAccidents);
  }

  changeUrlOnFilter(params) {
    /* Вызывается в дочернем компоненте таблицы. 
    Обрабатывает выставленне фильтры и добавляет параметры в url */
    getAcidentURL = 'https://tractor-factory-interface.herokuapp.com/api/accident/';
    console.log(params);
    let queryParams = '';
    if (params['accident_class'] > 0) {
      queryParams += 'accident_class=' + String(params['accident_class']) + '&';
    }
    delete params['accident_class'];
    for (let key in params) {
      if (params[key][0] != '' && params[key][1] == '') {
        // gte
        queryParams += key + '__gte=' + String(params[key][0]) + '&';
      } else if (params[key][0] == '' && params[key][1] != '') {
        // lte
        queryParams += key + '__lte=' + String(params[key][1]) + '&';
      } else if (params[key][0] == '' && params[key][1] == '') {
        // dont add param
        continue;
      } else {
        // date__range
        queryParams += key + '__date__range=' + params[key][0] + '%2C' + params[key][1] + '&'
      }
    }
    console.log(queryParams);
    getAcidentURL += `?${queryParams}`
  }

  clearFilter() {
    getAcidentURL = 'https://tractor-factory-interface.herokuapp.com/api/accident/';
  }

  async getAccidents() {
    const res = await fetch(getAcidentURL);
    const data = await res.json();
    this.setState({
      accidents: data.results,
    });
  }

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
              <h1>Мониторинг</h1>
              <table class="table" style={{ backgroundColor: 'none', fontSize: '18px', marginTop: '10px' }}>
                <tr>
                  <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                    <img src={arrow_forward} alt="" /></td>
                  <td style={{ border: 'none' }}>
                    <ConveyorTable accidentClasses={this.state.accidentClasses}/>
                  </td>
                  <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                    <img src={arrow_forward} alt="" /></td>
                </tr>
              </table>
              <div className="App-Accidents" class="table-responsive">
                <h1 style={{ textAlign: 'left', verticalAlign: 'middle', lineHeight: '30px', marginBottom: '30px', fontWeight: '600' }}>Список последних происшествий</h1>
                <AccidentTable 
                accidents={this.state.accidents} 
                accidentClasses={this.state.accidentClasses}
                changeUrlOnFilter={this.changeUrlOnFilter}
                clearFilter={this.clearFilter}/>
              </div>
              <Toaster position="bottom-right"/>
            </main>
          </div>
        </body>
        <footer></footer>
      </React.Fragment>
    );
  }
}
export default Monitoring;
