import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Users.css";
import TableUsers from "./TableUsers.js";
import ModalRegister from "./ModalRegister.js";
import Menu from "./Menu.js";
import Navbar from "./Navbar.js";
import axios from "axios";
import { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';

const getUsersURL =
  "https://tractor-factory-interface.herokuapp.com/api/users/all/";

class Users extends Component {
  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: [],
      isActiveModal: false,
      error: null,
    };
  }
  
  setActive = (s) => {
    this.setState({isActiveModal: s});
  }

  componentDidMount = () => {
    fetch(getUsersURL, {
      headers: {
        Authorization: `Token ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((users) => {
        this.setState({
          users: users.results,
        });
      });

    this.intervalGetUsers = setInterval(this.getUsers, 2500);
  };

  async getUsers() {
    const res = await fetch(getUsersURL, {
      headers: {
        Authorization: `Token ${localStorage.token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    this.setState({
      users: data.results,
    });
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalGetUsers);
  };

  render() {
    const users_list =
      typeof this.state.users == "undefined" ? null : this.state.users;
    return (
      <div>
        <body>
          <Navbar />
          <div>
            <div>
              <Menu />
            </div>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                  <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                  <div class=""></div>
                </div>
              </div>
              <h1>Пользователи</h1>
              <div style={{height: '75vh', overflowY: 'auto'}}>
                <TableUsers users_list={users_list} />
              </div>
              <button className="App-Button"
                onClick={(e) => this.setState({ isActiveModal: true })}>
                Регистрация нового пользователя
              </button>
            </main>
          </div>
          <ModalRegister
            isActive={this.state.isActiveModal}
            setActive={this.setActive}
            error={this.state.error}
          />
          <Toaster position="bottom-right" />

        </body>
        <footer></footer>
      </div>
    );
  }
}
export default Users;
