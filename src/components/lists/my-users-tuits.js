import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as listService from "../../services/lists-service";
import Tuits from "../tuits";
import Tuit from "../tuits/tuit";

const MyUsersTuits = () => {
    const [tuits, setTuits] = useState([]);
    const allUsersTuitsInList = () =>
        listService.getAllUsersTuitsInList("me")
            .then((tuits) => setTuits(tuits));
    useEffect(allUsersTuitsInList,[])

    return (
            <div>
                <Link to="/lists" classname='nav-link active'>
                    Back to List Screen
                </Link>
                <h1>My Users Tuits</h1>
                <br/>
                {
                    <Tuits tuits={tuits}/>
                }

            </div>
        )
};
export default MyUsersTuits;