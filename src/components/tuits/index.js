import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from '../../services/likes-service'
import * as dislikesService from '../../services/dislikes-service'
import * as bookmarksService from '../../services/bookmarks-service'


function Tuits({ tuits = [], deleteTuit, refreshTuits }) {
  const likeTuit = (tuit) =>
    likesService.userTogglesTuitLikes("me", tuit._id)
      .then(refreshTuits)
      .catch(e => alert(e));
  const dislikeTuit = (tuit) =>
    dislikesService.userTogglesDislikeTuit("me", tuit._id)
      .then(refreshTuits)
      .catch(e => alert(e));
  const bookmarkTuit = tuit =>
    bookmarksService.userTogglesBookmark("me", tuit._id)
      // may not need to refresh here
      .then(refreshTuits)
      .catch(e => alert(e));

  return (
    <div>
      <ul className="ttr-tuits list-group">
        {
          tuits.map && tuits.map(tuit => {
            return (
              <Tuit key={tuit._id}
                deleteTuit={deleteTuit}
                tuit={tuit}
                likeTuit={likeTuit}
                dislikeTuit={dislikeTuit}
                bookmarkTuit={bookmarkTuit}
              />
            );
          })
        }
      </ul>
    </div>
  );
}

export default Tuits;