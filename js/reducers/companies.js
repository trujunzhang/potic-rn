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

export type Company = {
    id: string;
    day: number;
    allDay: boolean;
    title: string;
    description: string;
    hasDetails: boolean;
    slug: string;
    onMySchedule: boolean;
    tags: Array<string>;
    startTime: number;
    endTime: number;
    map: ?string;
    location: ?string;
};

function fromParseSessions(company: Object): Company {
    return {
        id: company.id,
        day: company.get('day'),
        allDay: company.get('allDay'),
        title: company.get('sessionTitle'),
        description: company.get('sessionDescription'),
        hasDetails: company.get('hasDetails'),
        slug: company.get('sessionSlug'),
        speakers: (company.get('speakers') || []).map(fromParseSpeaker),
        onMySchedule: company.get('onMySchedule'),
        tags: company.get('tags') || [],
        startTime: company.get('startTime') && company.get('startTime').getTime(),
        endTime: company.get('endTime') && company.get('endTime').getTime(),
        map: company.get('sessionMap') && company.get('sessionMap').url(),
        location: company.get('sessionLocation'),
    };
}

module.exports = createParseReducer('LOADED_COMPANYIES', fromParseSessions);
