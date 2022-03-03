import axios from "axios";

// const TUITS_API = "https://fse-sp22-node-a2.herokuapp.com/tuits";
// const USERS_API = "https://fse-sp22-node-a2.herokuapp.com/users";

const TUITS_API = "http://localhost:4000/tuits";
const USERS_API = "http://localhost:4000/users";

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) =>
    axios.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteTuitsByAuthor = uid =>
    axios.delete(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);