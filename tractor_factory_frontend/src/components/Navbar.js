import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import logo from '../static/icons/ptz-logo.png';
import logout from '../static/icons/logout.svg';
import menu_open from '../static/icons/logout.svg';
import './style.css'

export default function Navbar() {
    let history = useHistory();

    function handleClick() {
        localStorage.removeItem('token');
        localStorage.removeItem('group');
        history.push("/");
    }

    return (
        <header class="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
            <span style={{ textAlign: 'left', verticalAlign: 'middle', paddingLeft: '10px' }}>
                <img style={{ paddingRight: '10px' }} src={logo} alt=""/>АО «Петербургский тракторный завод»
            </span>
            <button class="navbar-toggler position-absolute d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Открыть меню">
                <img style={{ paddingRight: '24px' }} src={menu_open} alt=""/>
            </button>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                    <a class="nav-link" style={{ verticalAlign: 'middle' }} >{localStorage.username}
                        <img style={{ paddingRight: '32px', paddingLeft: '12px' }} src={logout} onClick={handleClick} alt=""/>
                    </a>
                </div>
            </div>
        </header>
    )
}