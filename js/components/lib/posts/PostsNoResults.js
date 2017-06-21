'use strict';

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
var MainStyle = require('../main.css').default

class PostsNoResults extends Component {

    onSubmitOneClick() {
    }

    render() {
        let noMessageHint = "No articles yet. ";

        const {location, relatedList} = this.props;
        // if (!relatedList && !!location.query.query) {
        //     noMessageHint = "We didn’t find anything with that search term.";
        // }
        return (
            <View style={MainStyle['posts-no-results']}>
                <Text style={MainStyle['posts-no-results-left']}>{noMessageHint + " Why not"}</Text>
                <Text onClick={this.onSubmitOneClick.bind(this)}>submit one</Text>
                <Text>?</Text>
            </View>
        )
    }
}

export default PostsNoResults
