import * as service from "../../services/auth-service"
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import './profile.css'
import '../tuits/tuits.css'
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  const [isTuitsTabSelected, setIsTuitsTabSelected] = useState(true);
  const [isLikesTabSelected, setIsLikesTabSelected] = useState(false);
  const [isDislikesTabSelected, setIsDislikesTabSelected] = useState(false);

  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    service.logout()
      .then(() => navigate('/login'));
  }

  const toggleTabItem = tabNumber => {
      if (tabNumber === 0) {
          setIsTuitsTabSelected(true);
          setIsLikesTabSelected(false);
          setIsDislikesTabSelected(false);
      } else if (tabNumber === 1) {
          setIsTuitsTabSelected(false);
          setIsLikesTabSelected(true);
          setIsDislikesTabSelected(false);
      } else {
          setIsTuitsTabSelected(false);
          setIsLikesTabSelected(false);
          setIsDislikesTabSelected(true);
      }
    }

  return (
    <div className="container border rounded-corners">
        <div className="profile-page-header">
            <img src={`../images/react.png`}
                 className="profile-page-pic rounded-circle" />
             <div className="profile-page-details">
                 <h4>{profile.username}</h4>
                 <h6>@{profile.username}</h6>
             </div>
        </div>

        {/*<i className="fa-solid fa-pencil details-padding"/>*/}
        {/*<button type="button" className="fake-button" onClick={logout}>*/}
        {/*    Edit Profile*/}
        {/*</button>*/}
        {/*<br/>*/}
        <i className="fa-solid fa-hand-wave details-padding"/>
        <button type="button" className="fake-button" onClick={logout}>
            Logout
        </button>
      <br />
      <ul className="mt-4 nav nav-fill">
          {
              isTuitsTabSelected ?
                  <li className="nav-item tab-item-selected" onClick={() => toggleTabItem(0)}>
                    <div className='nav-link active tab-item'>
                        TUITS
                    </div>
                  </li> :
                  <li className="nav-item" onClick={() => toggleTabItem(0)}>
                      <div className='nav-link active tab-item'>
                          TUITS
                      </div>
                  </li>
          }
          {
              isLikesTabSelected ?
                  <li className="nav-item tab-item-selected" onClick={() => toggleTabItem(1)}>
                      <div className='nav-link active tab-item'>
                          LIKES
                      </div>
                  </li> :
                  <li className="nav-item" onClick={() => toggleTabItem(1)}>
                      <div className='nav-link active tab-item'>
                          LIKES
                      </div>
                  </li>
          }
          {
              isDislikesTabSelected ?
                  <li className="nav-item tab-item-selected" onClick={() => toggleTabItem(2)}>
                      <div className='nav-link active tab-item'>
                          DISLIKES
                      </div>
                  </li> :
                  <li className="nav-item" onClick={() => toggleTabItem(2)}>
                      <div className='nav-link active tab-item'>
                          DISLIKES
                      </div>
                  </li>
          }
      </ul>
      <br />
        {
            isTuitsTabSelected &&
                <>
                    <MyTuits/>
                    <br/>
                </>
        }
        {
            isLikesTabSelected &&
                <>
                    <MyLikes/>
                    <br/>
                </>
        }
        {
            isDislikesTabSelected &&
                <>
                    <MyDislikes/>
                    <br/>
                </>
        }
    </div>
  );
};
export default Profile;