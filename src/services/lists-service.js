import axios from "axios";

const BASE_URL = "https://fse-node-project.herokuapp.com"
// const BASE_URL = "http://localhost:4000";
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
                             withCredentials: true
                         });

export const getAllUsersInList = (uid) =>
    api.get(`${USERS_API}/${uid}/lists`)
        .then(response => response.data);

export const removeUserFromList = (uid, userId) =>
    api.delete(`${USERS_API}/${uid}/lists/${userId}`)
        .then(response => response.data);

export const addUserToList = (uid, userId) =>
    api.post(`${USERS_API}/${uid}/lists/${userId}`)
        .then(response => response.data);

export const getAllUsersNotInList = (uid) =>
    api.get(`${USERS_API}/${uid}/not/lists`)
        .then(response => response.data);

export const getAllUsersTuitsInList = (uid) =>
    api.get(`${USERS_API}/${uid}/lists/tuits`)
        .then(response => response.data);

