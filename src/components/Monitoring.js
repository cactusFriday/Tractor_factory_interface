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

const postAcidentURL = 'https://tractor-factory-interface.herokuapp.com/api/accident/';

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
    });
  }

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
                    <ConveyorTable/>
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