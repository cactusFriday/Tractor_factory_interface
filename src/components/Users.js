import "bootstrap/dist/css/bootstrap.min.css";
import "./Monitoring.css";
import "./style.css";
import Menu from "./Menu.js";
import Navbar from "./Navbar.js";
import axios from "axios";
import { Component } from "react";

const getUsersURL =
  "https://tractor-factory-interface.herokuapp.com/api/users/all/";
const postChangeGroupUser =
  "https://tractor-factory-interface.herokuapp.com/api/user/group/";

class Users extends Component {
  constructor() {
    super();
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
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
  }

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

  componentWillUnmount() {
    clearInterval(this.intervalGetUsers);
  }

  handleChangeGroupUser = (event, token_user, group_user) => {
    event.preventDefault();
    const user = {
      token: token_user,
      group: group_user,
    };

    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.withCredentials = true;

    let token = localStorage.getItem("token");

    axios
      .post(
        postChangeGroupUser,
        { user },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const users_list =
      typeof this.state.users == "undefined" ? null : this.state.users;
    return (
      <div>
        <body>
          <Navbar />
          <div class="row">
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
              <table
                className="Table-Users"
                style={{ borderColor: "black" }}
                class="table table-striped table-sm table-bordered"
              >
                <thead>
                  <tr>
                    <th class="text-center">Имя пользователя</th>
                    <th class="text-center">Почта</th>
                    <th class="text-center">Группа пользователя</th>
                    <th class="text-center"></th>
                  </tr>
                </thead>
                <tbody className="Table-body">
                  {users_list == null ? (
                    <p>Page is Loading ...</p>
                  ) : (
                    users_list.map((obj, i) => (
                      <tr>
                        <td>{obj.username}</td>
                        <td>{obj.email}</td>
                        <td>{obj.groups[0]}</td>
                        <td>
                          <select
                            onChange={(e) => {
                              this.handleChangeGroupUser(
                                e,
                                obj.token,
                                e.target.value
                              );
                            }}
                          >
                            <option value="Admin">Администратор</option>
                            <option value="Master">Мастер</option>
                            <option value="Guest">Гость</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </main>
          </div>
        </body>
        <footer></footer>
      </div>
    );
  }
}
export default Users;
