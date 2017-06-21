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


import Icon from 'react-native-vector-icons/MaterialIcons'

import SearchBar from './SearchBar'
import styles from '../general/SignInStyles'

class TopSearchPanel extends Component {

    onBackArrowClick() {

    }

    _handleResults() {

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
            <View style={{
                marginTop: 30,
                marginBottom: 20,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity style={{
                    marginLeft: 20,
                    marginRight: 12,
                    width: 20,
                    height: 34,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Icon
                        name='arrow-back'
                        size={20}
                        onPress={this.onBackArrowClick.bind(this)}
                        style={{color: '#eebb09',}}/>
                </TouchableOpacity>

                <View style={{flex: 1, height: 34}}>
                    <SearchBar
                        placeholder={this.props.placeholder}
                        ref={(ref) => this.searchBar = ref}
                        data={[]}
                        handleResults={this._handleResults.bind(this)}
                        showOnLoad
                    />

                </View>
            </View>
        )
    }

}

module.exports = TopSearchPanel
