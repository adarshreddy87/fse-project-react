import { React, useState, useEffect, useCallback } from "react";
import * as bookmarksService from '../../services/bookmarks-service.js';
import * as authService from '../../services/auth-service.js';
import * as service from "../../services/tuits-service.js";
import { useNavigate } from "react-router-dom";
import Tuits from "../tuits";


function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarkedtuits, setBookmarkedtuits] = useState([]);
  const [currentUser, setUser] = useState('');

  // A user must be logged in to see the bookmarks screen
  useEffect(() => {
    async function getUserProfile() {
      try {
        const loggedInUser = await authService.profile();
        const uid = loggedInUser._id;
        setUser(uid);
      } catch (e) {
        navigate('/login');
      };
    }
    getUserProfile();
  }, [navigate]);

  // Get the current logged in user's bookmarks
  const findBookmarks = useCallback(() => {
    if (currentUser) {
      return bookmarksService.findAllTuitsBookmarkedByUser(currentUser)
        .then(bookmarkedtuits => setBookmarkedtuits(bookmarkedtuits))
    };
  }, [currentUser]);

  // Don't get bookmarks on each rendering
  useEffect(() => {
    let isMounted = true;
    findBookmarks()
    return () => { isMounted = false; }
  }, [findBookmarks]);


  const deleteTuit = async (tid) => {
    await bookmarksService.deleteAllBookmarksOfTuit(tid).then(() => {
      service.deleteTuit(tid).then(findBookmarks)
    })
  }


  return (
    <div>
      <h1>Bookmarks Screen</h1>
      {bookmarkedtuits.length ?
        <Tuits tuits={bookmarkedtuits.map(mark => { return mark.tuit; })}
          deleteTuit={deleteTuit}
          refreshTuits={findBookmarks} /> : <h3>Add a bookmarked Tuit and see it here!</h3>}
    </div>
  );
}

export default Bookmarks;