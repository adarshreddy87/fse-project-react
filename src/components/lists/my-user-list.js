import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as listService from "../../services/lists-service";

const MyUserList = () => {
    const [users, setUsers] = useState([]);
    const allUsersInList = () =>
        listService.getAllUsersInList("me")
            .then((users) => setUsers(users));
    useEffect(allUsersInList,[]);
    const removeUser = (userId) =>
        listService.removeUserFromList("me", userId).then(allUsersInList)
    return (
        <div>
            <Link to="/lists" classname='nav-link active'>
                Back to List Screen
            </Link>
            <h1>My Users List</h1>
            <div className="list-group">
                {
                    users.map(user => {
                        return (
                            <Link className="list-group-item"
                                  key={user.addedUser._id}
                                  to={`/home/${user.addedUser._id}`}>
              <span className="fs-5">
                {user.addedUser.username}
              </span>
                                <i onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    removeUser(user.addedUser._id)
                                }} className="btn btn-outline-danger fas fa-remove fa-pull-right">
                                </i>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
};
export default MyUserList;