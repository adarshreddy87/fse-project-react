import React, { useEffect, useState } from "react";
import '../profile/profile.css'
import { Link } from "react-router-dom";
import {UserList} from "../profile/user-list";
import UsersList from "./users-list";
import MyUserList from "./my-user-list";
import MyUsersTuits from "./my-users-tuits";
const Lists = () => {

  const [isUsersTabSelected, setIsUsersTabSelected] = useState(true);
  const [isMyUsersTabSelected, setIsMyUsersTabSelected] = useState(false);
  const [isTuitsTabSelected, setIsTuitsTabSelected] = useState(false);

  const toggleTabItem = tabNumber => {
    if (tabNumber === 0) {
      setIsUsersTabSelected(true);
      setIsMyUsersTabSelected(false);
      setIsTuitsTabSelected(false);
    } else if (tabNumber === 1) {
      setIsUsersTabSelected(false);
      setIsMyUsersTabSelected(true);
      setIsTuitsTabSelected(false);
    } else {
      setIsUsersTabSelected(false);
      setIsMyUsersTabSelected(false);
      setIsTuitsTabSelected(true);
    }
  }

  return (
    <div className="container border rounded-corners">
      <br/>
      <h1>Lists Screen</h1>
      <ul className="mt-4 nav nav-fill">
        {
          isUsersTabSelected ?
              <li className="nav-item tab-item-selected" onClick={() => toggleTabItem(0)}>
                <div className="nav-link active tab-item">
                  USERS
                </div>
              </li> :
              <li className="nav-item" onClick={() => toggleTabItem(0)}>
                <div className="nav-link active tab-item">
                  USERS
                </div>
              </li>
        }
        {
          isMyUsersTabSelected ?
              <li className="nav-item tab-item-selected" onClick={() => toggleTabItem(1)}>
                <div className="nav-link active tab-item">
                  MY USERS LIST
                </div>
              </li> :
              <li className="nav-item" onClick={() => toggleTabItem(1)}>
                <div className="nav-link active tab-item">
                  MY USERS LIST
                </div>
              </li>
        }
        {
          isTuitsTabSelected ?
              <li className="nav-item tab-item-selected" onClick={() => toggleTabItem(2)}>
                <div className="nav-link active tab-item">
                  LIST TUITS
                </div>
              </li> :
              <li className="nav-item" onClick={() => toggleTabItem(2)}>
                <div className="nav-link active tab-item">
                  LIST TUITS
                </div>
              </li>
        }
      </ul>
      <br/>
      {
        isUsersTabSelected && <UsersList/>
      }
      {
        isMyUsersTabSelected && <MyUserList/>
      }
      {
        isTuitsTabSelected && <MyUsersTuits/>
      }
      <br/>
    </div>
  );
};
export default Lists;