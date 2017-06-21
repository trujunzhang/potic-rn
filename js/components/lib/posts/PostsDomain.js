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
var MainStyle = require('../main.css').default


/**
 * A: Remove “THE-VIEWSPAPER” from there
 * B: YES
 * A: “theviewspaper.net” on a line between the title and read more and link it to the domain page
 * B: “theviewspaper.net” on a line between the title and read more and link it to the domain page, need to add click event?
 * A: YES
 */
class PostsDomain extends Component {
    onDomainClick(event) {
        event.preventDefault()

        const {post, router} = this.props,
            domain = (post.sourceFrom || '').replace('www.', '')


        event.stopPropagation()
    }

    render() {
        const {post, domainClass} = this.props,
            domain = (post.sourceFrom || '').replace('www.', '')

        return (
            <View style={[MainStyle['domain_item'], MainStyle[domainClass]]}>
                <Text style={MainStyle['domain']} onClick={this.onDomainClick.bind(this)}>
                    { domain}
                </Text>
            </View>
        )
    }
}


export default PostsDomain


