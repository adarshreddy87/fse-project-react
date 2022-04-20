import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then(tuits => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    if (!dislikedTuits.length) {
        return (
            <h5>You haven't disliked any Tuits yet!</h5>
        )
    }
    return (
        <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike} />
    )
}

export default MyDislikes;