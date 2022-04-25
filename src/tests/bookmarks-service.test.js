// import axios from 'axios';
import 'regenerator-runtime/runtime'

import {
    findUserBookmarkedTuit,
    userTogglesBookmark,
    deleteAllBookmarksOfTuit,
    findAllTuitsBookmarkedByUser
} from "../services/bookmarks-service"

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

import {
    createTuit,
    deleteTuit
} from "../services/tuits-service";

// TEST USER TOGGLES BOOKMARK
describe('can toggle bookmark with REST API', () => {
    let newUser;
    let newTuit
    const testUser = {
        username: 'notARealUser',
        password: 'test',
        email: "not@real.com"
    }
    const testTuit = {
        tuit: "this is a test tuit"
    }

    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit = await createTuit(newUser._id, testTuit);
    })

    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuit(newTuit._id);
        await deleteAllBookmarksOfTuit(newTuit._id)
    })

    test('can bookmark a tuit not previously bookmarked by the user', async () => {
        // Confirm this tuit has not been bookmakred by the user yet
        let userBookmarkedTuit = await findUserBookmarkedTuit(newUser._id, newTuit._id);
        expect(userBookmarkedTuit).toEqual(null);

        // Confirm that the tuit is now bookmarked by the user
        await userTogglesBookmark(newUser._id, newTuit._id);
        userBookmarkedTuit = await findUserBookmarkedTuit(newUser._id, newTuit._id);
        expect(userBookmarkedTuit.tuit).toEqual(newTuit._id);
    });

    test('can unbookmark a tuit previously bookmarked by the user', async () => {
        // Confirm that the tuit is currently bookmarked by the user
        let userBookmarkedTuit = await findUserBookmarkedTuit(newUser._id, newTuit._id);
        expect(userBookmarkedTuit.tuit).toEqual(newTuit._id);

        // Confirm this tuit is now unbookmakred by the user yet
        await userTogglesBookmark(newUser._id, newTuit._id);
        userBookmarkedTuit = await findUserBookmarkedTuit(newUser._id, newTuit._id);
        expect(userBookmarkedTuit).toEqual(null);
    });
})


describe('can retrieve all bookmarked tuits from a user using REST API', () => {
    let newUser;
    let newTuit1;
    let newTuit2;
    let bookmarkedTuits;

    const testUser = {
        username: 'notARealUser',
        password: 'test',
        email: "not@real.com"
    }
    const testTuitOne = {
        tuit: "this is a test tuit #1"
    }

    const testTuitTwo = {
        tuit: "this is another test tuit #2"
    }

    beforeAll(async () => {
        await deleteUsersByUsername(testUser.username);
        newUser = await createUser(testUser);
        newTuit1 = await createTuit(newUser._id, testTuitOne);
        newTuit2 = await createTuit(newUser._id, testTuitTwo);
    })

    afterAll(async () => {
        await deleteUsersByUsername(testUser.username);
        await deleteTuit(newTuit1._id);
        await deleteTuit(newTuit2._id);
        await deleteAllBookmarksOfTuit(newTuit1._id)
        await deleteAllBookmarksOfTuit(newTuit2._id)
    })


    test("can retrieve a all of the user's bookmarked tuits", async () => {
        // Confirm the tuits in the user's bookmarks match the original tuits
        bookmarkedTuits = await findAllTuitsBookmarkedByUser(newUser._id);
        expect(bookmarkedTuits.length).toEqual(0);

        // Bookmark the new tuits
        await userTogglesBookmark(newUser._id, newTuit1._id);
        await userTogglesBookmark(newUser._id, newTuit2._id);

        // Retrieve all bookmakrs for the user
        bookmarkedTuits = await findAllTuitsBookmarkedByUser(newUser._id);
        // Confirm the bookmarks list is 2 tuits long
        expect(bookmarkedTuits.length).toEqual(2);
        // Confirm the first tuit is the newTuit1
        expect(bookmarkedTuits[0].tuit._id).toEqual(newTuit1._id);
        // Confirm the second tuit is the newTuit2
        expect(bookmarkedTuits[1].tuit._id).toEqual(newTuit2._id);

    });
});

