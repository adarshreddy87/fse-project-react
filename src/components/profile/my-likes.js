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

    return (
        <Tuits tuits={likedTuits}
            refreshTuits={findTuitsILike} />
    );
};
export default MyLikes;