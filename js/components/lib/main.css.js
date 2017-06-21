/**
 *  var css = require('js/components/lib/main.css')
 */

'use strict'


import {StyleSheet} from 'react-native'

import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
    'posts-no-results': {
        paddingTop: 4,
        paddingRight: 20,
        paddingBottom: 20,
        alignItems: 'center',
        height: 80
    },
    'posts-no-results-left': {},
    'header_3GFef': {
        height: 50,
        backgroundColor: 'red',
        flexDirection: 'column',
        alignItems: 'center'
    },
    'header_title': {
        backgroundColor: 'blue'
    },
    'title_38djq': {},
    'featured_2W7jd': {},
    'default_tBeAo': {},
    'base_3CbW2': {},

    // PostsItem
    'postItem_block': {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },

    // Thumbnail

    'post-list-thumbnail': {
        width: 60,
        height: 60,
    },
    // Content
    'row': {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    'post_title_row': {
        flexDirection: 'row',
    },

    'post-title': {
        "fontSize":16,
        "lineHeight":22,
        "fontWeight":"600",
        "fontStyle":"normal",
        "color":"#000000",
    },

    // domain
    'domain': {
        fontSize: 14,
        color: '#aaa'
    },
    // post.body
    'post_description': {
        "lineHeight":24,
        "fontWeight":"400",
        "fontStyle":"normal",
        "fontSize":14,
        "color":"#656565"
    },


})
