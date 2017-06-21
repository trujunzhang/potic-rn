import Telescope from '../index'
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

import Posts from '../../../lib/posts'
import Users from '../../../lib/users'

import { Col, Row, Grid } from "react-native-easy-grid";

class PostsItem extends Component {
    // A: Title + Image should open the “Read More” link - link to the original article
    // B: Title + Image in post list is like in post detail. click them will open original url?
    // A: YES

    renderContent() {
        const {post} = this.props,
            domain = (post.sourceFrom || '').replace('www.', '')

        return (
            <Col style={MainStyle['row']}>
                <View style={MainStyle['post_title_row']}>
                    <Text>

                <Text style={[MainStyle['post-title']]}>{post.title+' '}</Text>

                <Text style={MainStyle['domain']}>{domain}</Text>

                    </Text>

                </View>

                <Text
            ellipsizeMode='tail' numberOfLines={4}
            style={[MainStyle['post_description']]}
            onClick={this.onReadMoreClick.bind(this)}>
                    {post.body}
                </Text>

                {/*<Telescope.components.PostsItemActions {...this.props}/>*/}

            </Col>
        )
    }

    renderThumbnail() {
        const {post} = this.props,
            imageSet = Posts.getThumbnailSet(post)

        if (imageSet.small) {
            return (
                <Col
                    style={[MainStyle['post-thumbnail'], MainStyle['thumbnail_JX64A'], MainStyle['post-left-thumbnail']]}
                    onClick={this.onReadMoreClick.bind(this)}>
                    <Image source={{url: imageSet.small}} style={MainStyle['post-list-thumbnail']}/>
                </Col>
            )
        }
        return null
    }

    render() {
        const {post} = this.props,
              imageSet = Posts.getThumbnailSet(post)

        return (
                <Grid style={MainStyle['postItem_block']}>
                {!!imageSet.small?(
                        <Col style={{ width: 60, marginRight: 8,marginTop:2}} >
                        <Image source={{url: imageSet.small}} style={MainStyle['post-list-thumbnail']}/>
                        </Col>

                ):null
                }
                {this.renderContent()}
            </Grid>
        )
    }

    onReadMoreClick(e) {
        e.preventDefault()

        e.stopPropagation()
    }

    popupDetail(event) {
        event.preventDefault()
        event.stopPropagation()
    }

}

export default PostsItem
