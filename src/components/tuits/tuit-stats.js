import {React, useState, useEffect} from "react";

const TuitStats = ({tuit,
                       likeTuit = () => {},
                       dislikeTuit = () => {},
                       bookmarkTuit = () => {},
                       userLikedTuit, userDislikedTuit, userBookmarkedTuit}) =>
{
    // Use local state variables to update like/dislike icons and stats instantly
    const [liked, setLiked] = useState(userLikedTuit);
    const [disliked, setDisliked] = useState(userDislikedTuit)
    const [bookmarked, setBookmarked] = useState(false);
    useEffect(() => {
        setLiked(userLikedTuit);
        setDisliked(userDislikedTuit);
        setBookmarked(userBookmarkedTuit);
    }, [userLikedTuit, userDislikedTuit, userBookmarkedTuit])
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"></i>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"></i>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span onClick={
                    () => {
                        likeTuit(tuit)
                        setLiked(!liked)
                        setDisliked(false)
                    }}>
                    {
                        tuit.stats && tuit.stats.likes > 0 && liked &&
                        <i className="fas fa-thumbs-up" style={{color: 'red'}}></i>
                    }
                    {
                        tuit.stats && !liked &&
                        <i className="far fa-thumbs-up"></i>
                    }
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col">
                <span onClick={
                    () => {
                        dislikeTuit(tuit)
                        setDisliked(!disliked)
                        setLiked(false)
                    }}>
                    {
                        tuit.stats && tuit.stats.dislikes > 0 && disliked &&
                        <i className="fas fa-thumbs-down" style={{color: 'red'}}></i>
                    }
                    {
                        tuit.stats && !disliked &&
                        <i className="fa-regular fa-thumbs-down"></i>
                    }
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col">
                <span>
                    <i className="far fa-inbox-out"></i>
                </span>
            </div>
            <div className="col">
                <span onClick={() => {
                    bookmarkTuit(tuit)
                    setBookmarked(!bookmarked)
                }}>
                    {
                        bookmarked ? <i className="fa-solid fa-bookmark"></i>
                            : <i className="fa-regular fa-bookmark"></i>
                    }
                </span>
            </div>
        </div>
    );
}
export default TuitStats;