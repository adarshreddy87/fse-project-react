import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import * as authService from '../../services/auth-service';
import {useEffect, useState} from "react";
import {useLocation, useParams, useNavigate} from "react-router-dom";
import './home.css'

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {uid} = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const [profile, setProfile] = useState({});
  const usersWithPictures = ['alice', 'bob', 'chaplin', 'charlie', 'nasa', 'spacex'];
  const findTuits = () => {
    if(uid) {
      return service.findTuitsByUser(uid)
        .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    }
  }

  // A user must be logged in to see the home screen
  useEffect(async () => {
    try {
      const loggedInUser = await authService.profile();
      setProfile(loggedInUser);
    } catch (e) {
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);
  // const createTuit = () =>
  //     service.createTuit(userId, {tuit})
  //         .then(findTuits)
  const deleteTuit = (tid) =>
      service.deleteTuit(tid)
          .then(findTuits)
  // refresh tuits needs to be tweaked
  console.log(profile);
  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
      </div>
      <div className="border negative-top-margin col-container">
        <div className="row-container">
          {
            usersWithPictures.includes(profile.username) ?
                <img src={`../images/${profile.username}.jpg`} className="rounded-circle ttr-tuit-avatar-logo"/>
                : <img src={`../images/react.png`}
                       className="profile-avatar-pic rounded-circle"/>
          }
          <input className="create-tuit-input" placeholder="What's on your mind?"/>
        </div>
        <div>
          <button className="btn btn-primary rounded-pill tuit-button-home align-button-right">Tuit</button>
        </div>
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit} refreshTuits={findTuits}/>
    </div>
  );
};
export default Home;