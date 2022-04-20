import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyLikes = () => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);

    if (!likedTuits.length) {
        return (
            <h5>You haven't liked any Tuits yet!</h5>
        )
    }

    return (
        <Tuits tuits={likedTuits}
            refreshTuits={findTuitsILike} />
    );
};
export default MyLikes;