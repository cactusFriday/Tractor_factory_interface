import { useHistory } from "react-router-dom";
import './style.css';

const NotEnoughRights = () => {
    const history = useHistory();

    function pushToLogin() {
        history.push("/monitoring");
    }
    
        return(
            <div style={{textAlign: 'center', verticalAlign: 'middle', marginTop: '100px'}}>
                <h1>У вас нет прав на просмотр данной страницы.</h1>
                <button class="btn btn-primary" style={{ marginTop: '50px'}}onClick={pushToLogin}>
                    Вернуться к мониторингу</button>
            </div>
            
        )
    
}

export default NotEnoughRights;