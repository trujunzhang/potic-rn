import Telescope from '../index'
import React, {Component} from 'react'
import Users from '../../../lib/users'
import Posts from '../../../lib/posts'
let md5 = require('blueimp-md5')

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
 * Make day wise groups on category pages, remove calendar widget from tag and source pages
 * So calendar will only show on “Homepage” and “Category” page
 * Homepage and category pages will have day wise groups
 */
class PostsHome extends Component {


    renderPostDaily() {
        // TODO: FIXME: djzhang
        //  On homepage - Popular posts this week + today + yesterday + 1 more day to be show
        //  Popular posts = 5 posts
        //   Today = 20 posts
        //   Yesterday = 10 Posts
        //   Other days = 10 Posts
        //   Number of posts to be shown before “Show More” Button

        return (<Telescope.components.PostsDaily key={'postDaily'}/>)
    }

    renderPostList(key) {
        const params = {},
            location = {},
            limit = Telescope.settings.get('postsPerPage', 10)

        const terms = {...params, listId: 'posts.list.main', view: 'new', limit: limit}

        return (<Telescope.components.PostsList
            key={key}
            limit={limit}
            terms={terms}
            listId={'single-list-view'}
            {...Posts.generatePostListTitle(location, params)}/>)
    }

    render() {

        return this.renderPostList('wanghao')
    }
}

export default PostsHome
