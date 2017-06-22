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
 * @providesModule F8App
 * @flow
 */

'use strict';

import React, {Component} from 'react'
var AppState = require('AppState');
var LoginScreen = require('./login/LoginScreen');
var StyleSheet = require('StyleSheet');
var F8Navigator = require('F8Navigator');
var View = require('View');
var StatusBar = require('StatusBar');
// var {
//     loadConfig,
// } = require('./actions');
var {updateInstallation} = require('./actions/installation');
var {connect} = require('react-redux');

var WebComponents = require('./playground/WebComponents');

var {version} = require('./env.js');

class F8App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playground: true,
            // playground: false,
        };
    }

    componentDidMount() {
        // TODO: Make this list smaller, we basically download the whole internet
        // this.props.dispatch(loadConfig());
    }

    render() {
        if (this.state.playground) {
            return <WebComponents/>
            // return <DriverInfoCallout/>
            // return (
            //     <View style={{backgroundColor: 'black', flex: 1}}>
            //         <PushBottomDriverInfo/>
            //     </View>
            // )
        }

        // if (!this.props.isLoggedIn) {
        //     return <LoginScreen />;
        // }

        return (
            <View style={{flex: 1,}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="light-content"/>
                <F8Navigator />
            </View>
        );
    }

}

function select(store) {
    return {
        isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
        userId: store.user.id,
        userName: store.user.name
    };
}


module.exports = connect(select)(F8App);
