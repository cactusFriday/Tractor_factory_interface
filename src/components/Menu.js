import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css'
import { Component } from 'react';
import { NavItem, NavLink, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu.js";
import home  from '../static/icons/home.svg';
import scoreboard from '../static/icons/scoreboard.svg';
import events from '../static/icons/events.svg';
import monitoring from '../static/icons/monitoring.svg';
import displays from '../static/icons/displays.svg';
import planning from '../static/icons/planning.svg';
import reports from '../static/icons/reports.svg';
import admin from '../static/icons/admin.svg';
import settings from '../static/icons/settings.svg';

const Menu = () => (
  <div className="sidebar">
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p />
        <NavItem>
          <NavLink tag={Link}>
            <img src={home} className="mr-2" alt="" />
            Главная
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link}>
            <img src={scoreboard} className="mr-2" alt="" />
            Табло ГТК
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link}>
            <img src={events} className="mr-2" alt="" />
            Такты
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link}>
            <img src={monitoring} className="mr-2" alt="" />
            Мониторинг
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link}>
            <img src={displays} className="mr-2" alt="" />
            Экраны
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);
const submenus = [
  [
    {
      title: "Дорожно строительная техника",
      target: "",
    },
    {
      title: "Годовой план",
      target: "",
    },
    {
      title: "Месячный план",
      target: "",
    },
    {
      title: "Ежедневные планы",
      target: "",
    }
  ]
]
export default Menu;