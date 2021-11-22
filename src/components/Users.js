import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Users.css";
import TableUsers from "./TableUsers.js";
import Menu from "./Menu.js";
import Navbar from "./Navbar.js";
import { Component } from "react";

const getUsersURL =
  "https://tractor-factory-interface.herokuapp.com/api/users/all/";

class Users extends Component {
  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: [],
    };
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
              <TableUsers users_list={users_list} />
            </main>
          </div>
        </body>
        <footer></footer>
      </div>
    );
  }
}
export default Users;
