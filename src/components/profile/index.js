import * as service from "../../services/auth-service"
import { useEffect, useState } from "react"
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MyTuits from "./my-tuits";
import MyLikes from "./my-likes";
const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
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
  return (
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button type="button" className="btn btn-primary" onClick={logout}>
        Logout
      </button>
      <br />
      <ul className="mt-4 nav nav-pills nav-fill">
        <li className="nav-item">
          <Link to="/profile/mytuits" className='nav-link active'>
            Tuits
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile/mylikes" className='nav-link active'>
            Likes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile/mydislikes" className='nav-link active'>
            Dislikes
          </Link>
        </li>
      </ul>
      <br />

    </div>
  );
};
export default Profile;