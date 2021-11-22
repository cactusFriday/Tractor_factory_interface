import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import Menu from './Menu.js';
import Navbar from './Navbar.js';
import './style.css';
import logo from '../static/icons/ptz-logo.png';

const NotEnoughRights = () => {
    const history = useHistory();

    function pushToLogin() {
        history.push("/monitoring");
    }
    
    return (
        <div>
            <body>
                <Navbar />
                <div class="row">
                <div>
                    <Menu />
                </div>
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                <div style={{ textAlign: 'center', verticalAlign: 'middle', marginTop: '100px' }}>
                    <h1>У вас нет прав на просмотр данной страницы.</h1>
                </div>
                </main>
                </div>
            </body>
        </div>
    )
}

export default NotEnoughRights;