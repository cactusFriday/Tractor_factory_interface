import { useHistory } from "react-router-dom";
import './style.css';

const Unauthorized = () => {
    const history = useHistory();

    function pushToLogin() {
        history.push("/");
    }
    
        return(
            <div style={{textAlign: 'center', verticalAlign: 'middle', marginTop: '100px'}}>
                <h1>Вы не авторизованы, чтобы просматривать данную страницу!</h1>
                <button class="btn btn-primary" style={{ marginTop: '50px'}}onClick={pushToLogin}>
                    Перейти к авторизации</button>
            </div>
            
        )
    
}

export default Unauthorized;