/**
 * Register.js
 *
 * Allow user to register
 */
'use strict'

import Telescope from '../index'

import Icon from 'react-native-vector-icons/MaterialIcons'

/**
 * The necessary React
 */
import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native'
const {width, height} = Dimensions.get('window')

class GeneralLoginList extends Component {

    constructor(props, context) {
        super(props)

        this.state = this.initialState = {
            formType: 'signIn',
        }

        props.actions.loginState()
    }

    toggleForm(formType) {
        this.setState({formType: formType})
    }

    onBackArrowClick() {
        this.toggleForm('list')
    }

    onButtonsHandler(obj) {
        this.props.actions.loginState()
        this.toggleForm('signIn')
    }

    renderBackArrowIcon() {
        return (
            <View style={{flex: 1}}>
                <View style={{marginTop: 40, marginLeft: 20, backgroundColor: 'transparent'}}>
                    <TouchableOpacity
                        onPress={this.onBackArrowClick.bind(this)}
                        style={{width: 40, height: 40}}>
                        {(this.state.formType === 'list') ? null : (
                            <Icon name='arrow-back' size={20} style={{color: '#fff'}}/>
                        )}
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    renderForm() {
        switch (this.state.formType) {
            default:
                debugger
                return (
                    <Telescope.components.AppLogin
                        toggleEvent={this.toggleForm.bind(this)}
                        dispatch={this.props.dispatch}
                        actions={this.props.actions}/>
                )
            case 'signUp':
                return (
                    <Telescope.components.AppRegister
                        toggleEvent={this.toggleForm.bind(this)}
                        actions={this.props.actions}
                        roleType={this.state.roleType}/>
                )
            // case 'forgotPassword':
            //     return this.renderForgotPassword()
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <View style={{backgroundColor: 'white', justifyContent: 'center', width, height}}>

                    <Telescope.components.HeaderLogo/>

                    <View style={{flex: 7}}>
                        {this.renderForm()}
                    </View>

                </View>

            </View>
        )
    }

}


/**
 * ## Imports
 *
 * Redux
 */
import {connect} from 'react-redux'


import * as authActions from '../../../reducers/auth/authActions'
import {bindActionCreators} from 'redux'

function mapDispatchToProps(dispatch) {
    // console.log("General Login List, dispatch: " + JSON.stringify(dispatch));
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(GeneralLoginList)
