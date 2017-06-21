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
import React, {PropTypes} from 'react'
import
{
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native'

/**
 * Project component that will respond to onPress
 */
const FormButton = require('./FormButton')


import logoTitle from '../images/general/logo_title.png'

var HeaderLogo = React.createClass({
    /**
     * ## Header.class
     * set the initial state of having the button be disabled.
     */
    getInitialState () {
        return {
            text: '',
            isDisabled: true
        }
    },
    /**
     * ### propTypes
     * * isFetching: display the spinner if true
     * * showState: should the JSON state, currentState, be displayed
     * * currentState: the JSON state
     * * onGetState: the action to call to get the current state
     * * onSetState: the action to call to set the state
     */
    propTypes: {
        isFetching: PropTypes.bool,
        showState: PropTypes.bool,
        currentState: PropTypes.object,
        onGetState: PropTypes.func,
        onSetState: PropTypes.func
    },
    /**
     * ### _onPressMark
     * Call the onGetState action passing the state prop
     */
    _onPressMark () {
        this.props.onGetState(!this.props.showState)
    },
    /**
     * ### _onChangeText
     * when the textinput value changes, set the state for that component
     */
    _onChangeText (text) {
        this.setState({
            text,
            isDisabled: false
        })
    },
    /**
     * ### _updateStateButtonPress
     * When the button for the state is pressed, call ```onSetState```
     */
    _updateStateButtonPress () {
        this.props.onSetState(this.state.text)
    },

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
    render () {
        return (
            <View style={{flex: 2, paddingLeft: 60, paddingRight: 60,}}>
                <Image source={logoTitle} resizeMode="contain" style={{flex: 1, width: null, height: null,}}/>
            </View>
        )
    }
})

module.exports = HeaderLogo
