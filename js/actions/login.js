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

const Parse = require('parse/react-native');
const ActionSheetIOS = require('ActionSheetIOS');
const {Platform} = require('react-native');
const Alert = require('Alert');
const FacebookSDK = require('FacebookSDK');

import type {Action, ThunkAction} from './types';


async function ParseFacebookLogin(scope): Promise {
    return new Promise((resolve, reject) => {
        Parse.FacebookUtils.logIn(scope, {
            success: resolve,
            error: (user, error) => reject(error && error.error || error),
        });
    });
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

async function _logInWithFacebook(source: ?string): Promise<Array<Action>> {
    await ParseFacebookLogin('public_profile,email,user_friends');
    const profile = await queryFacebookAPI('/me', {fields: 'name,email'});

    const user = await Parse.User.currentAsync();
    user.set('facebook_id', profile.id);
    user.set('name', profile.name);
    user.set('email', profile.email);
    await user.save();
    await updateInstallation({user});

    const action = {
        type: 'LOGGED_IN',
        source,
        data: {
            id: profile.id,
            name: profile.name,
            sharedSchedule: user.get('sharedSchedule'),
        },
    };

    return Promise.all([
        Promise.resolve(action),
        restoreSchedule(),
    ]);
}

function logInWithFacebook(source: ?string): ThunkAction {
    return (dispatch) => {
        const login = _logInWithFacebook(source);

        // Loading friends schedules shouldn't block the login process
        login.then(
            (result) => {
                dispatch(result);
                dispatch(loadFriendsSchedules());
                dispatch(loadSurveys());
            }
        );
        return login;
    };
}

async function _logInWithPassword(username: string, password: string): Promise<Array<Action>> {
    debugger

    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);

    let loginWithPassword = user.logIn();
    await loginWithPassword;
    // await updateInstallation({user});

    var profile = null;
    await loginWithPassword.then((result) => {
        profile = result;
        // console.log("result: " + JSON.stringify(result));
    });

    // console.log("profile: " + JSON.stringify(profile));

    const userData = {
        id: profile.id,
        name: profile.get("username"),
        roleType: profile.get("roleType"),
        sharedSchedule: user.get('sharedSchedule'),
    };

    // console.log("userData: " + JSON.stringify(userData));

    const action = {
        type: 'LOGGED_IN',
        data: userData
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
            (result) => {
                dispatch(result);
            }
        );
        return login;
    };
}


async function _signUpWithPassword(username: string, email: string, password: string, roleType: string): Promise<Array<Action>> {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);

    let signUpWithPassword = user.signUp({'roleType': roleType});
    await signUpWithPassword;
    // await updateInstallation({user});

    var profile = null;
    await signUpWithPassword.then((result) => {
        profile = result;
        console.log("signup result: " + JSON.stringify(result));
    });

    console.log("signup profile: " + JSON.stringify(profile));

    const userData = {
        id: profile.id,
        name: profile.get("username"),
        roleType: profile.get("roleType"),
        sharedSchedule: user.get('sharedSchedule'),
    };

    console.log("signup userData: " + JSON.stringify(userData));

    const action = {
        type: 'LOGGED_IN',
        data: userData
    };

    return Promise.all([
        Promise.resolve(action),
        restoreSchedule(),
    ]);
}

function signUpWithPassword(username: string, email: string, password: string, roleType: string): ThunkAction {
    return (dispatch) => {
        const login = _signUpWithPassword(username, email, password, roleType);

        // Loading friends schedules shouldn't block the login process
        login.then(
            (result) => {
                dispatch(result);
            }
        );
        return login;
    };
}


function skipLogin(): Action {
    return {
        type: 'SKIPPED_LOGIN',
    };
}

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


export default {
    signUpWithPassword, logInWithFacebook, logInWithTwitter,
    logInWithPassword,
    skipLogin, logOut,
    newUserFolderWithPost
}
