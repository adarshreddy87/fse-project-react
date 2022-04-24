import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import * as authService from '../../services/auth-service';
import * as bookmarksService from '../../services/bookmarks-service';
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './home.css'


const Home = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [tuits, setTuits] = useState([]);
  const [currentTuit, setCurrentTuit] = useState("");
  const [profile, setProfile] = useState({});
  const usersWithPictures = ['alice', 'bob', 'chaplin', 'charlie', 'nasa', 'spacex'];

  const findTuits = useCallback(() => {
    if (uid) {
      return service.findTuitsByUser(uid)
        .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    };
  }, [uid]);

  // A user must be logged in to see the home screen
  useEffect(() => {
    async function getUserProfile() {
      try {
        const loggedInUser = await authService.profile();
        setProfile(loggedInUser);
      } catch (e) {
        navigate('/login');
      };
    }
    getUserProfile();
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => { isMounted = false; }
  }, [findTuits]);

  const createTuit = () =>
    service.createTuit(profile._id, { tuit: currentTuit })
      .then(() => {
        findTuits();
        setCurrentTuit("");
      })

  const deleteTuit = async (tid) => {
    await bookmarksService.deleteAllBookmarksOfTuit(tid).then(() => {
      service.deleteTuit(tid).then(findTuits)
    })
  }


  // refresh tuits needs to be tweaked
  return (
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
      </div>
      <div className="border negative-top-margin col-container">
        <div className="row-container">
          {
            usersWithPictures.includes(profile.username) ?
              <img src={`../images/${profile.username}.jpg`}
                className="rounded-circle ttr-tuit-avatar-logo"
                alt="avatar" />
              : <img src={`../images/react.png`}
                className="profile-avatar-pic rounded-circle" alt="avatar" />
          }
          <input className="create-tuit-input"
            placeholder="What's on your mind?"
            value={currentTuit}
            onChange={event => setCurrentTuit(event.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary rounded-pill tuit-button-home align-button-right" onClick={createTuit}>
            Tuit
          </button>
        </div>
      </div>
      <br />
      <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findTuits} />
    </div>
  );
};
export default Home;