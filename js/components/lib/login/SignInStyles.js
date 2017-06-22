import {StyleSheet} from 'react-native'

import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
    pageContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    },
    columnContainer: {
        flexDirection: 'column',
        flex: 1
    },
    screneContainer: {
        flex: 1,
    },
    wrapper: {
        paddingVertical: 30,
    },
    inputWrap: {
        flexDirection: 'row',
        marginVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC'
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 20,
        width: 20,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#eebb09',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    forgotPasswordText: {
        color: '#D8D8D8',
        backgroundColor: 'transparent',
        textAlign: 'right',
        paddingRight: 15,
    },
    signinWrap: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupWrap: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accountText: {
        color: '#D8D8D8'
    },
    whiteFont: {
        color: '#FFF',
    },
    signupLinkText: {
        color: '#FFF',
        marginLeft: 5,
    },
    socialWrap: {
        marginTop: 12,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialTitle: {
        marginRight: 12,
    },
    roundWhiteButton: {
        backgroundColor: '#FFFFFF',
        width: width - 40,
        height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    roundBaseButton: {
        backgroundColor: '#eebb09',
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    roundBaseDisableButton: {
        backgroundColor: 'grey',
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    roundButton: {
        backgroundColor: '#eebb09',
        width: width - 40,
        height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    roundButtonText: {
        color: '#000',
        fontSize: 14,
    },
    loginTypesList: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
    },
    // Driver Home
    driverTaskTitleText: {
        marginTop: 10,
        marginBottom: 10,
        color: '#fff',
        fontSize: 12,
        // fontFamily: 'proximanova-regular'
    },
    driverTaskValueText: {
        marginBottom: 14,
        color: '#fff',
        fontSize: 10,
        // fontFamily: 'proximanova-regular'
    },

    // Top Navigation title
    navigationBarTitle: {
        color: '#fff',
        fontSize: 14,
    },
    // Driver conversation list item.
    driverConversationTitle: {
        color: '#000',
        fontSize: 14,
    },

    //Client InBox
    roundClientListAcceptButton: {
        backgroundColor: '#eebb09',
        width: 80,
        height: 30,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    roundClientListDeclineButton: {
        backgroundColor: '#d3d3d3',
        width: 80,
        height: 30,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    roundClientListButtonText: {
        color: '#000',
        fontSize: 12,
    },
    roundRequestAnOrderButton: {
        backgroundColor: '#eebb09',
        width: width - 40 - 40,
        height: 40,
        borderRadius: 40 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    // Client home list item
    clientHomeListItem: {
        height: 140,
    },
    clientHomeListItemTitle: {
        height: 140,
        color: '#000',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
