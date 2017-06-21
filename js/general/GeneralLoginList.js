/**
 * Register.js
 *
 * Allow user to register
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import {connect} from 'react-redux'

import RoundButton from '../components/RoundButton'
import  HeaderLogo from '../components/HeaderLogo'
import  AppLogin from './AppLogin'
import  AppRegister from './AppRegister'

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

const {
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
} = require('../lib/constants').default

import styles from './SignInStyles'

var F8Button = require('F8Button');

class GeneralLoginList extends Component {

    constructor(props, context) {
        super(props)

        this.state = this.initialState = {
            formType: 'list',
            roleType: 'client'
        }
    }

    toggleForm(formType) {
        this.setState({formType: formType})
    }

    onBackArrowClick() {
        this.toggleForm('list')
    }

    onButtonsHandler(obj) {
        this.props.actions.loginState()
        this.setState({roleType: obj.tag})
        this.toggleForm('signIn')
    }

    renderTypesList() {
        const buttonArray = [
            {title: 'Driver Login', tag: 'driver'},
            {title: 'Client Login', tag: 'client'},
            {title: 'Admin Login', tag: 'admin'}
        ]

        return (
            <View style={styles.loginTypesList}>
                {buttonArray.map((object, index) =>
                    <F8Button
                        key={index}
                        style={{
                            width: width - 40,
                            height: 60,
                            paddingVertical: 10,
                            // marginTop: 20,
                            marginBottom: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        contentStyle={{width: width - 40, height: 60}}
                        textStyle={{
                            color: '#000',
                            fontSize: 14,
                            // fontWeight: "800"
                        }}
                        type="primary"
                        caption={object.title}
                        onPress={this.onButtonsHandler.bind(this, object)}
                    />
                )}
            </View>
        )
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
        const {formType} = this.state
        switch (formType) {
            default:
                return this.renderTypesList()
            case 'signIn':
                return (
                    <AppLogin toggleEvent={this.toggleForm.bind(this)}
                              actions={this.props.actions}/>
                )

            case 'signUp':
                return <AppRegister toggleEvent={this.toggleForm.bind(this)}
                                    actions={this.props.actions}
                                    roleType={this.state.roleType}/>
            // case 'forgotPassword':
            //     return this.renderForgotPassword()
        }
    }

    render() {
        return (
            <View style={styles.screneContainer}>
                <Image source={require('../images/general/bg.jpg')} style={{width, height}} resizeMode="cover">

                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.44)', justifyContent: 'center', width, height}}>

                        {this.renderBackArrowIcon()}

                        <HeaderLogo/>

                        <View style={{flex: 7}}>
                            {this.renderForm()}
                        </View>

                    </View>

                </Image>

            </View>
        )
    }

}

import * as authActions from '../reducers/auth/authActions'
import {bindActionCreators} from 'redux'

function mapDispatchToProps(dispatch) {
    // console.log("General Login List, dispatch: " + JSON.stringify(dispatch));
    return {
        actions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(GeneralLoginList)
module.exports = connect(null, mapDispatchToProps)(GeneralLoginList);
