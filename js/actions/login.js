/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

'use strict';

// ========================
// For Mobile Apps
// ========================

function logInWithTwitter(source: ?object): ThunkAction {

}

const FacebookSDK = require('FacebookSDK');

function logOut(): ThunkAction {
    return (dispatch) => {
        Parse.User.logOut();
        // updateInstallation({user: null, channels: []});

        // TODO: Make sure reducers clear their state
        return dispatch({
            type: 'LOGGED_OUT',
        });
    };
}


function logOutWithPrompt(): ThunkAction {
    return (dispatch, getState) => {
        let name = getState().user.name || 'there';

        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: `Hi, ${name}`,
                    options: ['Log out', 'Cancel'],
                    destructiveButtonIndex: 0,
                    cancelButtonIndex: 1,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        dispatch(logOut());
                    }
                }
            );
        } else {
            Alert.alert(
                `Hi, ${name}`,
                'Log out from F8?',
                [
                    {text: 'Cancel'},
                    {text: 'Log out', onPress: () => dispatch(logOut())},
                ]
            );
        }
    };
}

async function queryFacebookAPI(path, ...args): Promise {
    return new Promise((resolve, reject) => {
        FacebookSDK.api(path, ...args, (response) => {
            if (response && !response.error) {
                resolve(response);
            } else {
                reject(response && response.error);
            }
        });
    });
}


/**
 * The states were interested in
 */
const {
    LOGGED_IN,
    LOGGED_OUT,
    SET_SHARING,
    LOADED_USER_FOLDERS,
    SELECTED_USER_FOLDER,
    ADDED_NEW_FOLDER_WITH_POST
} = require('../lib/constants').default

const Parse = require('parse/react-native')
// const FacebookSDK = require('FacebookSDK')
const {updateInstallation} = require('./installation')

let {Folder, Post} = require('./objects').default

const {fromParseUser} = require('../reducers/parseModels')

import type {Action, ThunkAction} from './types'

function getUserCallback(user) {
    return fromParseUser(user)
}

async function makeNewFolderForUser(user: Any, foldName: string = 'Read Later', postId: string = null): Promise {
    let data = {
        'name': foldName,
        'visible': (foldName === 'Read Later') ? 'Lock' : '',
        'user': user,
        posts: []
    }
    if (!!postId) {
        data['posts'] = [Post.createWithoutData(postId)]
    }
    return await new Folder(data).save()
}

async function ParseFacebookLogin(scope): Promise {
    return new Promise((resolve, reject) => {
        Parse.FacebookUtils.logIn(null, {
            success: resolve,
            error: (user, error) => reject(error && error.error || error),
        })
    })
}

async function _logInWithFacebook(source: ? object): Promise<Array<Action>> {
    const facebookUser = await ParseFacebookLogin('public_profile,email,name,user_friends');
    const profile = await queryFacebookAPI('/me', {fields: 'name,email'});

    let user = facebookUser

    user.set('username', profile.name)
    user.set('email', profile.email)
    user.set('loginType', 'facebook')
    if ((user.get('folders') || []).length === 0) {
        const defaultFolder = await  makeNewFolderForUser(user)
        user.set('folders', [defaultFolder])
    }
    await user.save();

    // await updateInstallation({user})

    const action = {
        type: LOGGED_IN,
        payload: getUserCallback(user)
    }

    return Promise.all([
        Promise.resolve(action)
    ])
}

function logInWithFacebook(source: ?object): ThunkAction {
    return (dispatch) => {
        const login = _logInWithFacebook(source)

        // Loading friends schedules shouldn't block the login process
        login.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return login
    }
}


async function _logInWithPassword(username: string, password: string): Promise<Array<Action>> {
    const user = new Parse.User()
    user.set('username', username)
    user.set('password', password)

    await user.logIn()

    const action = {
        type: LOGGED_IN,
        payload: getUserCallback(user)
    };

    return Promise.all([
        Promise.resolve(action)
    ]);
}

function logInWithPassword(username: string, password: string): ThunkAction {
    return (dispatch) => {
        const login = _logInWithPassword(username, password);

        // Loading friends schedules shouldn't block the login process
        login.then(
            ([result]) => {
                dispatch(result);
            }
        );
        return login;
    };
}


async function _signUpWithPassword(username: string, email: string, password: string): Promise<Array<Action>> {
    const user = new Parse.User()
    user.set('username', username)
    user.set('password', password)
    user.set('email', email)

    // await updateInstallation({user})
    await user.signUp({'loginType': 'email'})

    if ((user.get('folders') || []).length === 0) {
        const defaultFolder = await  makeNewFolderForUser(user)
        user.set('folders', [defaultFolder])
    }

    await user.save();

    const action = {
        type: LOGGED_IN,
        payload: getUserCallback(user)
    }

    return Promise.all([
        Promise.resolve(action)
    ])
}

function signUpWithPassword(username: string, email: string, password: string): ThunkAction {
    return (dispatch) => {
        const login = _signUpWithPassword(username, email, password)

        // Loading friends schedules shouldn't block the login process
        login.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return login
    }
}


/**
 *
 * @param folder: Object
 * {
 * "name": folder._name
 * "folderId": folder._id|| false
 * "postExist": folder.post._exist|| false
 * }
 * @param postId
 * @param userId
 * @returns {Promise.<*>}
 * @private
 */
async function _newUserFolderWithPost(folder: object, postId: string, userId: string): Promise<Array<Action>> {
    const user = await Parse.User.currentAsync();
    const {folderName, folderId, postExist} = folder

    let newFolder = null
    if (folderId !== '') {// Exist
        if (postExist === false) {
            newFolder = await new Parse.Query(Folder).get(folderId)
            let _posts = newFolder.get('posts')
            _posts.push(Post.createWithoutData(postId))
            newFolder.set('posts', _posts)
            await newFolder.save()
            await user.save()
        }
    } else { // New
        newFolder = await  makeNewFolderForUser(user, folderName, postId)
        let _folders = user.get('folders')
        _folders.push(newFolder)
        user.set('folders', _folders)
        await user.save()
    }

    const action = {
        type: ADDED_NEW_FOLDER_WITH_POST,
        payload: getUserCallback(user)
    }

    return Promise.all([
        Promise.resolve(action)
    ])
}

function newUserFolderWithPost(folderName: string, postId: string, userId: string): ThunkAction {
    return (dispatch) => {
        const action = _newUserFolderWithPost(folderName, postId, userId)

        // Loading friends schedules shouldn't block the login process
        action.then(
            ([result]) => {
                dispatch(result)
            }
        )
        return action
    }
}


function skipLogin(): Action {
    return {
        type: 'SKIPPED_LOGIN',
    }
}


export default {
    signUpWithPassword, logInWithFacebook, logInWithTwitter,
    logInWithPassword,
    skipLogin, logOut,
    newUserFolderWithPost
}
