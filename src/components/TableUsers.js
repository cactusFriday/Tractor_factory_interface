import React, { useCallback } from "react";
import "./TableUsers.css";
import "bootstrap/dist/css/bootstrap.css";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import axios from "axios";

const postChangeGroupUser =
  "https://tractor-factory-interface.herokuapp.com/api/user/group/";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const changeNameGroupFromEnglish = (nameGroup) => {
  switch (nameGroup) {
    case "Admin":
      return "Администратор";
    case "Guest":
      return "Гость";
    default:
      return "Мастер";
  }
};

export default function TableUsers(props) {
  const { items, requestSort, sortConfig } = useSortableData(props.users_list);
  const [displaySpinner, setDisplaySpinner] = React.useState(false);
  const [indexItemList, setIndexItemList] = React.useState(0);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleChangeGroupUser = useCallback(
    (token_user, group_user, index_list_users) => {
      setDisplaySpinner(true);
      setIndexItemList(index_list_users);

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
          setDisplaySpinner(false);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  return (
    <table
      className="Table-Users"
      style={{ borderColor: "black" }}
      class="table table-striped table-sm table-bordered"
    >
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("username")}
              className={getClassNamesFor("username")}
            >
              Имя пользователя
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("email")}
              className={getClassNamesFor("email")}
            >
              Почта
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("groups")}
              className={getClassNamesFor("groups")}
            >
              Группа пользователя
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>
              {item.email != localStorage.getItem("email") ? (
                <Dropdown>
                  <Dropdown.Toggle variant="secondary">
                    {displaySpinner && indexItemList == i && (
                      <>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </>
                    )}
                    {changeNameGroupFromEnglish(item.groups[0])}
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={(e) =>
                        handleChangeGroupUser(item.token, "Admin", i)
                      }
                    >
                      Администратор
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) =>
                        handleChangeGroupUser(item.token, "Master", i)
                      }
                    >
                      Мастер
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) =>
                        handleChangeGroupUser(item.token, "Guest", i)
                      }
                    >
                      Гость
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button>{changeNameGroupFromEnglish(item.groups[0])}</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
