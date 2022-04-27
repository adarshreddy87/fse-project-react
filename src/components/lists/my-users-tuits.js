import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as listService from "../../services/lists-service";
import Tuits from "../tuits";


const MyUsersTuits = () => {
    const [tuits, setTuits] = useState([]);
    const allUsersTuitsInList = () =>
        listService.getAllUsersTuitsInList("me")
            .then((tuits) => setTuits(tuits));
    useEffect(allUsersTuitsInList, [])

    return (
        <>
            <Tuits tuits={tuits} />
        </>

    )
}
export default MyUsersTuits;