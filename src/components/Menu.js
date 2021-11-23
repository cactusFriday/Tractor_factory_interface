import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import "./style.css";
import { useHistory } from "react-router-dom";
import home from "../static/icons/home.svg";
import scoreboard from "../static/icons/scoreboard.svg";
import events from "../static/icons/events.svg";
import monitoring from "../static/icons/monitoring.svg";
import displays from "../static/icons/displays.svg";
import planning from "../static/icons/planning.svg";
import reports from "../static/icons/reports.svg";
import admin from "../static/icons/admin.svg";
import settings from "../static/icons/settings.svg";
import people from "../static/icons/people-fill.svg";

export default function Menu() {
  const history = useHistory();

  function pushToRegister() {
    history.push("/register");
  }
  function pushToConfig() {
    history.push("/config");
  }
  function pushToMonitoring() {
    history.push("/monitoring");
  }
  function pushToUsers() {
    history.push("/users");
  }
  function pushToMain() {
    history.push("/main");
  }
  return (
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div class="position-sticky">
        <ul class="nav flex-column">
          <li class="nav-item" onClick={pushToMain}>
            <a class="nav-link" style={{ color: "white" }} aria-current="page">
              <img style={{ paddingRight: "24px" }} src={home} alt="" />
              Главная
            </a>
          </li>
          {/*<li class="nav-item">
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={scoreboard} alt="" />
              Табло ГТК
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={events} alt="" />
              Такты
            </a>
          </li>*/}
          <li class="nav-item" onClick={pushToMonitoring}>
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={monitoring} alt="" />
              Мониторинг
            </a>
          </li>
          {/*<li class="nav-item">
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={displays} alt="" />
              Экраны
            </a>
          </li>
          <li class="nav-item">
            <div class="d-grid gap-2 btn-group dropend">
              <button
                type="button"
                class="btn btn-secondary shadow-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img style={{ paddingRight: "24px" }} src={planning} alt="" />
                Планы
              </button>
              <div class="dropdown-menu">
                <span class="dropdown-item">
                  <b>Дорожно-строительная техника</b>
                </span>
                <a class="dropdown-item" href="#">
                  Годовой план
                </a>
                <a class="dropdown-item" href="#">
                  Месячный план
                </a>
                <a class="dropdown-item" href="#">
                  Ежедневные планы
                </a>
                <hr class="dropdown-divider" />
                <a class="dropdown-item">
                  <b>Сельскохозяйственная техника</b>
                </a>
                <a class="dropdown-item" href="#">
                  Годовой план
                </a>
                <a class="dropdown-item" href="#">
                  Месячный план
                </a>
                <a class="dropdown-item" href="#">
                  Ежедневные планы
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="d-grid gap-2 btn-group dropend">
              <button
                type="button"
                class="btn btn-secondary shadow-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  style={{ paddingRight: "24px", verticalAlign: "middle" }}
                  src={reports}
                  alt=""
                />
                Отчеты
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                  Происшествия
                </a>
                <a class="dropdown-item" href="#">
                  Время работы
                </a>
                <a class="dropdown-item" href="#">
                  Список тактов
                </a>
                <a class="dropdown-item" href="#">
                  Активность пользователей
                </a>
              </div>
            </div>
          </li>
           <li class="nav-item">
            <div class="d-grid gap-2 btn-group dropend">
              <button
                type="button"
                class="btn btn-secondary shadow-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img style={{ paddingRight: "24px" }} src={admin} alt="" />
                Управление
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">
                  Настройки
                </a>
                <a class="dropdown-item" href="#">
                  Типы происшествий
                </a>
                <a class="dropdown-item" href="#">
                  Управление доступом
                </a>
                <a class="dropdown-item" href="#">
                  События конвейера
                </a>
              </div>
            </div>
          </li> */}
          <li class="nav-item" onClick={pushToConfig}>
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={settings} alt="" />
              Конфигурация
            </a>
          </li>
          {/*<li class="nav-item" onClick={pushToRegister}>
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={admin} alt="" />
              Регистрация пользователей
            </a>
          </li>*/}
          <li class="nav-item" onClick={pushToUsers}>
            <a class="nav-link" style={{ color: "white" }}>
              <img style={{ paddingRight: "24px" }} src={people} alt="" />
              Пользователи
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
