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

import type {Action} from '../actions/types';

function track(action: Action): void {
  switch (action.type) {
    case 'LOGGED_IN':
      break;

    case 'LOGGED_OUT':
      break;

    case 'SKIPPED_LOGIN':
      break;

    case 'SESSION_ADDED':
      Parse.Analytics.track('addToSchedule', {id: action.id});
      break;

    case 'SESSION_REMOVED':
      Parse.Analytics.track('removeFromSchedule', {id: action.id});
      break;

    case 'TURNED_ON_PUSH_NOTIFICATIONS':
      break;

    case 'SKIPPED_PUSH_NOTIFICATIONS':
      break;

    case 'SET_SHARING':
      break;

    case 'APPLY_TOPICS_FILTER':
      break;
  }
}

module.exports = track;
