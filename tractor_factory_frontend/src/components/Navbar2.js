import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import logo from '../static/icons/ptz-logo.png';
import logout from '../static/icons/logout.svg';
import './Navbar.css'

export default function Navbar() {
    let history = useHistory();

    function handleClick() {
        localStorage.removeItem('token');
        localStorage.removeItem('group');
        history.push("/");
    }


    return (
        <header className="App-header" >
            <span className="App-navbar">
                <img className="App-logo" src={logo} alt="" />
                АО «Петербургский тракторный завод»
            </span>
            <span className="App-logout">
                <p style={{ float: 'right', paddingTop: '10px'}}> NEAD\PTZ
                    <img onClick={handleClick} style={{ paddingRight: '32px', paddingLeft: '12px' }} src={logout} alt="" />
                </p>
            </span>
        </header>
    )
}