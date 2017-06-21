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
const Platform = require('Platform');
const InteractionManager = require('InteractionManager');
const ActionSheetIOS = require('ActionSheetIOS');
const Alert = require('Alert');
const Share = require('react-native-share');
const Shipment = Parse.Object.extend('Shipment');
const ShippingTask = Parse.Object.extend('ShippingTask');
const logError = require('logError');


var {
    loadShipments,
    loadShippingTasks
} = require('./parse');

import type {ThunkAction, PromiseAction, Dispatch} from './types';

async function _addToShipment(name: string, userId: string): Promise<Array<Action>> {
    var userPointer = Parse.User.createWithoutData(userId);

    const object = new Shipment();
    object.set('name', name);
    object.set('adminUser', userPointer);
    object.set('status', "created");

    let task = object.save();
    await task;

    var newShipment = null;
    await task.then((result) => {
        newShipment = result;
        console.log("newShipment result: " + JSON.stringify(result));
    });

    console.log("asyn after newShipment: " + JSON.stringify(newShipment));

    const action = {
        type: 'New_shipment_success',
    };

    return Promise.all([
        Promise.resolve(action)
    ]);
}

function addToShipment(name: string, userId: string): ThunkAction {
    return (dispatch) => {
        const task = _addToShipment(name, userId);

        // Loading friends schedules shouldn't block the login process
        task.then(
            (result) => {
                dispatch(result);
                dispatch(loadShipments(userId));
            }
        );
        return task;
    };
}


async function _inviteClientAnOrder(userId: string, userName: string, clientId: string, shipmentId: string, pickedShipment: string): Promise<Array<Action>> {
    console.log("invite client an order, userId: " + userId);

    const object = new ShippingTask();
    object.set('admin', Parse.User.createWithoutData(userId));
    object.set('client', Parse.User.createWithoutData(clientId));
    object.set('shipment', Shipment.createWithoutData(shipmentId));
    object.set('status', "order");
    object.set('shipType', "adminOrder");
    object.set('adminName', userName);
    object.set('shipName', pickedShipment);

    var savedShippingTask = null;
    let task = object.save();
    await task.then((result) => {
        savedShippingTask = result;
        console.log("new Shipping Task, result: " + JSON.stringify(result));
    });

    console.log("asyn after savedShippingTask: " + JSON.stringify(savedShippingTask));

    const action = {
        type: 'New_Client_Invite_success',
    };

    return Promise.all([
        Promise.resolve(action)
    ]);
}

function inviteClientAnOrder(userId: string, userName: string, clientId: string, shipmentId: string, pickedShipment: string): ThunkAction {
    return (dispatch) => {
        const task = _inviteClientAnOrder(userId, userName, clientId, shipmentId, pickedShipment);

        // Loading friends schedules shouldn't block the login process
        task.then(
            (result) => {
                dispatch(result);
                dispatch(loadShipments(userId));
            }
        );
        return task;
    };
}


async function _clientChangeInvitedShipmentStatus(shippingTaskId: string, status: string, userId: string): Promise<Array<Action>> {
    var query = new Parse.Query(ShippingTask);
    query.equalTo("objectId", shippingTaskId);

    var findObject = null;
    await query.first({
        success: function (object) {
            // Successfully retrieved the object.
            findObject = object;
            // console.log("client change shipment status successfully!");
        },
        error: function (error) {
            console.log("client change shipment status Error: " + error);
            // alert("Error: " + error.code + " " + error.message);
        }
    });

    if (findObject) {
        findObject.set('status', status);
        var savedObject = null;
        let task = findObject.save();
        await task.then((result) => {
            savedObject = result;
            console.log("updated invitedShipment status: " + JSON.stringify(result));
        });

        console.log("updated invitedShipment status: " + JSON.stringify(savedObject));

        const action = {
            type: 'Update_Shipment_Status_success',
        };
        return Promise.all([
            Promise.resolve(action),
        ]);
    } else {
        const action = {
            type: 'Update_Shipment_Status_failure',
        };
        return Promise.all([
            Promise.resolve(action)
        ]);
    }
}

function clientChangeInvitedShipmentStatus(shippingTaskId: string, status: string, userId: string): ThunkAction {
    return (dispatch) => {
        const task = _clientChangeInvitedShipmentStatus(shippingTaskId, status, userId);

        // Loading friends schedules shouldn't block the login process
        task.then(
            (result) => {
                dispatch(result);
                dispatch(loadShippingTasks(userId));
            }
        );
        return task;
    };
}

module.exports = {addToShipment, inviteClientAnOrder, clientChangeInvitedShipmentStatus};
