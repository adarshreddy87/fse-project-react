import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as listService from "../../services/lists-service";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const allUsersNotInList = () =>
        listService.getAllUsersNotInList("me")
            .then((users) => setUsers(users));
    const addUserToList = (userId) =>
        listService.addUserToList("me", userId)
    useEffect(allUsersNotInList,[]);
    return (
        <div>
            <Link to="/lists" classname='nav-link active'>
                Back to List Screen
            </Link>
            <h1>Users</h1>
            <div className="list-group">
                {
                    users.map(user => {
                        return (
                            <Link className="list-group-item"
                                  key={user._id}
                                  to={`/home/${user._id}`}>
              <span className="fs-3">
                {user.username}
              </span>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    addUserToList(user._id)
                                }} className="btn btn-success fa-pull-right">
                                    <i className="fas fa-add"></i>
                                </button>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};
export default UsersList;