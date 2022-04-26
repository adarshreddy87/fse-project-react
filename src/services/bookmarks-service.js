import axios from "axios";

const BASE_URL = "https://fse-node-project.herokuapp.com";
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const findUserBookmarkedTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/bookmarks/${tid}`)
        .then(response => response.data);

export const userTogglesBookmark = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/bookmarks/toggle/${tid}`)
        .then(response => response.data);

export const deleteAllBookmarksOfTuit = tid =>
    api.delete(`${BASE_URL}/api/tuits/${tid}/bookmarks`)
        .then(response => response.data);

export const findAllTuitsBookmarkedByUser = uid =>
    api.get(`${BASE_URL}/api/users/${uid}/bookmarks`)
        .then(response => response.data);
