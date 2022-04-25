import 'regenerator-runtime/runtime'

import {
    getAllUsersInList,
    removeUserFromList,
    addUserToList,
    getAllUsersNotInList,
    getAllUsersTuitsInList
} from "../services/lists-service"

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit
} from "../services/tuits-service";

// TEST USER ADDS ANOTHER USER TO LisT
describe('can add or remove users from list with REST API', () => {
    let newUser;
    let addedUser;
    let excludedUser;

    const testUser1 = {
        username: 'test user 1',
        password: 'test',
        email: "not@real.com"
    }

    const testUser2 = {
        username: 'test user 2',
        password: 'test',
        email: "not@real.com"
    }

    const testUser3 = {
        username: 'test user 3',
        password: 'test',
        email: "not@real.com"
    }


    beforeAll(async () => {
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
        await deleteUsersByUsername(testUser3.username);
        newUser = await createUser(testUser1);
        addedUser = await createUser(testUser2);
        excludedUser = await createUser(testUser3);
    })

    afterAll(async () => {
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
        await deleteUsersByUsername(testUser3.username);
    })

    test('can add a user to a list', async () => {
        // Confirm this user is not in the list
        let usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList).toEqual([]);

        // Confirm that the user is added to the user list
        await addUserToList(newUser._id, addedUser._id);
        usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList.length).toEqual(1);
        expect(usersInList[0].addedUser._id).toEqual(addedUser._id);
        expect(usersInList[0].addedBy).toEqual(newUser._id);
    });

    test('can remove a user to a list', async () => {
        // Confirm this user is in the list
        let usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList.length).toEqual(1);
        expect(usersInList[0].addedUser._id).toEqual(addedUser._id);
        expect(usersInList[0].addedBy).toEqual(newUser._id);

        // Confirm that the user is removed from the list
        await removeUserFromList(newUser._id, addedUser._id);
        usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList).toEqual([]);
    });

    test('can find users not added to the list', async () => {
        // Confirm that the user is now added to the list
        await addUserToList(newUser._id, addedUser._id);
        let usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList.length).toEqual(1);
        expect(usersInList[0].addedUser._id).toEqual(addedUser._id);
        expect(usersInList[0].addedBy).toEqual(newUser._id);
        let excludedList = await getAllUsersNotInList(newUser._id);
        expect(excludedList.includes(excludedUser)).toBe(false);
    });
});


// TEST ADD NEW USER TO LIST, ADD NEW TUIT, RETRIEVE TUIT LIST
describe('can add or remove users from list with REST API', () => {
    let newUser;
    let addedUser;
    let newTuit;

    const testUser1 = {
        username: 'test user 1',
        password: 'test',
        email: "not@real.com"
    }

    const testUser2 = {
        username: 'test user 2',
        password: 'test',
        email: "not@real.com"
    }

    const testTuit = {
        tuit: "this is a test tuit"
    }

    beforeAll(async () => {
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
        newUser = await createUser(testUser1);
        addedUser = await createUser(testUser2);
        newTuit = await createTuit(addedUser._id, testTuit);
    })

    afterAll(async () => {
        await deleteUsersByUsername(testUser1.username);
        await deleteUsersByUsername(testUser2.username);
        await deleteTuit(newTuit._id);
    })

    test('can retrieve all tuits from user list', async () => {
        // Confirm this user is not in the list
        let usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList).toEqual([]);

        // Confirm user is added to list
        await addUserToList(newUser._id, addedUser._id);
        usersInList = await getAllUsersInList(newUser._id);
        expect(usersInList.length).toEqual(1);
        expect(usersInList[0].addedUser._id).toEqual(addedUser._id);
        expect(usersInList[0].addedBy).toEqual(newUser._id);

        // Retrieve user list
        let tuitList = await getAllUsersTuitsInList(newUser._id);
        expect(tuitList[0]._id).toEqual(newTuit._id);
    });
});