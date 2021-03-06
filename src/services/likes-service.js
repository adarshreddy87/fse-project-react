import axios from "axios";

const BASE_URL = "https://fse-node-project.herokuapp.com"
// const BASE_URL = "http://localhost:4000";
const USERS_API = `${BASE_URL}/api/users`;
const LIKES_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${LIKES_API}/${tid}/likes`)
        .then(response => response.data);

export const findUserLikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findAllTuitsLikedByUser = userId =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);