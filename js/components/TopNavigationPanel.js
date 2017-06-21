/**
 * # Header.js
 *
 * This component initially displays a image. But when clicked, things
 * get interesting.
 *
 * On the initial display after being clicked, the
 * textinput will display the current ```state``` of the application.
 *
 * The button will be enabled and if clicked, whatever state is now
 * contained in the textinput will be processed and the application
 * will be restored to that state.
 *
 * By pasting in a previous state, the application will reset to that
 * state
 *
 * When the mark image is clicked, it is just toggled to display or hide.
 */
'use strict'

/**
 * ## Imports
 *
 * React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

/**
 * Project component that will respond to onPress
 */
const FormButton = require('./FormButton')

import styles from '../general/SignInStyles'

import Icon from 'react-native-vector-icons/MaterialIcons'

class TopNavigationPanel extends Component {

    onBackArrowClick() {
        if (!!this.props.handlePress) {
            this.props.handlePress()
        }
    }

    /**
     * ### render
     *
     * if showState, stringify the currentState and display it to the
     * browser for copying. Then display to the user.
     *
     * When the value of the input changes, call ```_onChangeText```
     *
     * When the 'Update State' button is pressed, we're off to the
     * races with Hot Loading...just call the
     * ```_updateStateButtonPress``` and away we go...
     *
     */
    render() {

        return (
            <View
                onPress={this.onBackArrowClick.bind(this)}
                style={{
                    width: width,
                    marginTop: 40,
                    marginBottom: 20,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={this.onBackArrowClick.bind(this)}
                    style={{
                        marginLeft: 20,
                        marginRight: 12,
                        width: 34,
                        height: 34,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Icon name='arrow-back' size={20} style={{color: '#eebb09',}}/>
                </TouchableOpacity>
                <Text style={[styles.navigationBarTitle, {width: 200}]}>
                    {this.props.title ? this.props.title : 'Log'}
                </Text>
            </View>
        )
    }

}

module.exports = TopNavigationPanel
