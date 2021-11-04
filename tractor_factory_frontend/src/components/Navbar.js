import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import logo from '../static/icons/ptz-logo.png';
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <header className="App-header" >
                <span className="App-navbar">
                    <img className="App-logo" src={logo} alt="" />
                    АО «Петербургский тракторный завод»
                </span>
            </header>
        )
    }
}
export default Navbar;