import 'bootstrap/dist/css/bootstrap.min.css';
import './Monitoring.css';
import './style.css'
import Menu from './Menu.js';
import Navbar from './Navbar.js';
import AccidentTable from './AccidentTable.js';
import ConveyorTable from './ConveyorTable.js';
import arrow_forward from '../static/icons/arrow_forward.svg';
import axios from 'axios';
import { Component } from 'react';

const postAcidentURL = 'https://tractor-factory-interface.herokuapp.com/api/accident/'

class Monitoring extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      accidents: [],
      accidentDetails:{},
    }
  };

  componentDidMount() {
    fetch(postAcidentURL)
    .then(res => res.json())
    .then(accidents => {
        // console.log(accidents);
        this.setState({
            loading: false,
            accidents: accidents.results,
        });
        console.log(accidents.results);
        console.log(Object.values(accidents.results));
        var l = Object.values(accidents.results);
        console.log(l[0]);
        console.log(l[0].post);
    });
  }
  
  handleFormSubmit = (e) => {
    e.preventDefault();
    let trgt = e.target
    // Вытягиваем данные из формы, приводим к принятому формату
    let timeEnd = ":00+00:00";
    let time_appeared = trgt.timeAppeared.value ==='' ? null : trgt.timeAppeared.value.replace('T', ' ') + timeEnd;
    let time_solved = trgt.timeSolved.value === '' ? null : trgt.timeSolved.value.replace('T', ' ') + timeEnd;
    const accidentDetails = {
      time_appeared: time_appeared,
      time_solved: time_solved,
      post: parseInt(trgt.post.placeholder),
      accident_class: parseInt(trgt.accidentClass.value),
      description: trgt.description.value
    }
    this.setState({
      accidentDetails,
    });

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    // Сериализуем, отправляем на сервер, создавая новое происшествие.
    // При получении ответа обновляем состояние новым происшествием.
    // При обновлении состояния компонент рендерится заново, значит,
    // список с актуальными происшествиями, переданный как пропсы в компонент таблицы, будет отрендерен
    axios.post(postAcidentURL, JSON.stringify(accidentDetails), {
      headers: {
        'Authorization': `Token ${localStorage.token}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => this.setState(() => {
      let accidents = [...this.state.accidents];
      accidents.push(res.data);
      return {accidents: accidents};
    }))
    .catch((error) => {
      console.log(error);
    });
  };



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
                    <ConveyorTable handleOnSubmit={this.handleFormSubmit}/>
                  </td>
                  <td style={{ width: '3%', verticalAlign: 'middle', border: 'none' }}>
                    <img src={arrow_forward} alt="" /></td>
                </tr>
              </table>
              <div className="App-Accidents">
                <h1 style={{ textAlign: 'left', verticalAlign: 'middle', lineHeight: '30px', marginBottom: '30px', fontWeight: '600' }}>Список последних происшествий</h1>
                <AccidentTable accidents={this.state.accidents}/>
              </div>
            </main>
          </div>
        </body>
        <footer></footer>
      </div>
    );
  }
}
export default Monitoring;