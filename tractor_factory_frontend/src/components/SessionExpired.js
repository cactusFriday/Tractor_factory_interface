import { useHistory } from "react-router-dom";
import './style.css';
import logo from '../static/icons/ptz-logo.png';

const SessionExpired = () => {
    const history = useHistory();

    function pushToLogin() {
        history.push("/");
    }
    
  return (
    <div>
      <body>
        <header class="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow">
          <span style={{ textAlign: 'left', verticalAlign: 'middle', paddingLeft: '10px' }}>
            <img style={{ paddingRight: '10px' }} src={logo} alt='' />АО «Петербургский тракторный завод»
          </span>
        </header>
        <div style={{ textAlign: 'center', verticalAlign: 'middle', marginTop: '100px' }}>
          <h1>Ваша сессия истекла.</h1>
          <button class="btn btn-primary" style={{ marginTop: '50px' }} onClick={pushToLogin}>
            Перейти к авторизации</button>
        </div>
      </body>
    </div>
  )
}

export default SessionExpired;