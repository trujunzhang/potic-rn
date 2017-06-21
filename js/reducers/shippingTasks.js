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

const createParseReducer = require('./createParseReducer');

export type ShippingTask = {
    id: string;
    adminId: string;
    clientId: string;
    shipmentId: string;
    status: string;
    shipmentName: string;
};

function fromParseObject(map: Object): ShippingTask {
    // console.log("after client invite: " + JSON.stringify(map));
    // console.log("after client invite's shipment: " + JSON.stringify(map.get('shipment')));
    return {
        id: map.id,
        adminId: map.get('admin').id,
        clientId: map.get('client').id,
        shipmentId: map.get('shipment').id,
        status: map.get('status'),
        shipType: map.get('shipType'),
        shipmentName: map.get('shipment').get("name")
    };
}

module.exports = createParseReducer('LOADED_SHIPPING_TASKS', fromParseObject);
