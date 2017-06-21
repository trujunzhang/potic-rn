import React from 'react';

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


const PostsLoading = ({id}) => {
    return (
        <View className="post_loading_same_height_as_load_more">
            <View className="loading_2hQxH featured_2W7jd subtle_1BWOT base_3CbW2">
                <View className={"post-loadmore-spinner"}>
                    {/*<span>*/}
                    {/*<FormattedMessage id={id}/>*/}
                    {/*</span>*/}
                    {/*<div className="bounce1"/>*/}
                    {/*<div className="bounce2"/>*/}
                    {/*<div className="bounce3"/>*/}
                </View>
            </View>
        </View>
    )
};


export default PostsLoading
