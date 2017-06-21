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

const PostsLoadMore = ({loadMore, className = "posts-load-more"}) => {
    return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
            <Text style={{
                color: '#000',
                fontSize: 14
            }}>{"djzhang"}</Text>
        </View>
    )
};


export default PostsLoadMore;
