import { React, useEffect, useState } from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import * as likesService from '../../services/likes-service'
import * as dislikesService from '../../services/dislikes-service'
import * as bookmarksService from '../../services/bookmarks-service'
import * as userService from "../../services/users-service";
import * as authService from '../../services/auth-service.js';


const Tuit = ({ tuit, deleteTuit, likeTuit, dislikeTuit, bookmarkTuit }) => {
  const [userLikedTuit, setUserLikedTuit] = useState(false);
  const [userDislikedTuit, setUserDislikedTuit] = useState(false);
  const [userBookmarkedTuit, setUserBookmarkedTuit] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLogged, setUserLogged] = useState("");
  const usersWithPictures = ['alice', 'bob', 'chaplin', 'charlie', 'nasa', 'spacex'];

  // Get currently logged in user
  useEffect(() => {
    async function getUserProfile() {
      try {
        const currentProfile = await authService.profile();
        const loggedUsername = currentProfile.username;
        setUserLogged(loggedUsername);
      } catch (e) {
        console.log(e);
      };
    }
    getUserProfile();
  }, []);


  // Get tuit author
  useEffect(() => {
    if (tuit.postedBy.username) {
      setUserName(tuit.postedBy.username);
    } else {
      userService.findUserById(tuit.postedBy).then(res => {
        if (res) {
          setUserName(res.username);
        }
      });
    }
  }, [tuit.postedBy])

  useEffect(() => {
    if (tuit) {
      likesService.findUserLikesTuit("me", tuit._id)
        .then(response => {
          if (response) {
            setUserLikedTuit(true);
          }
        });
    }
  }, [tuit])

  useEffect(() => {
    if (tuit) {
      dislikesService.findUserDislikesTuit("me", tuit._id)
        .then(response => {
          if (response) {
            setUserDislikedTuit(true);
          }
        });
    }
  }, [tuit])

  useEffect(() => {
    if (tuit) {
      bookmarksService.findUserBookmarkedTuit("me", tuit._id)
        .then(response => {
          if (response) {
            setUserBookmarkedTuit(true);
          }
        });
    }
  }, [tuit])


  function RenderDelete() {
    if (userLogged === userName) {
      return <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>

    } else { return <i className="ttr-delete-button-disabled fas fa-remove fa-2x fa-pull-right"></i> };
  };

  return (
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy && usersWithPictures.includes(tuit.postedBy.username) ?
            <img src={`../images/${tuit.postedBy.username}.jpg`}
              className="ttr-tuit-avatar-logo rounded-circle"
              alt="avatar" />
            :
            <img src={`../images/react.png`}
              className="ttr-tuit-avatar-logo rounded-circle"
              alt="avatar" />
        }
      </div>
      <div className="w-100">
        <RenderDelete />
        <h2
          className="fs-5">
          {userName}@{userName}</h2>
        {tuit.tuit}
        {
          tuit.youtube &&
          <TuitVideo tuit={tuit} />
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit} />
        }
        <TuitStats tuit={tuit}
          likeTuit={likeTuit}
          dislikeTuit={dislikeTuit}
          bookmarkTuit={bookmarkTuit}
          userLikedTuit={userLikedTuit}
          userDislikedTuit={userDislikedTuit}
          userBookmarkedTuit={userBookmarkedTuit}
        />
      </div>
    </li>
  );
}
export default Tuit;