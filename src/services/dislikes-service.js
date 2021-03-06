import axios from "axios";

const BASE_URL = "https://fse-node-project.herokuapp.com"
// const BASE_URL = "http://localhost:4000"
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesDislikeTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const findUserDislikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const findAllTuitsDislikedByUser = uid =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);