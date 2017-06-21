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


class PostsListTitle extends Component {

    constructor(props, context) {
        super(props)
    }

    onRightSortBarClick(title) {
        // const router = this.props.router;
        // const newQuery = _.clone(router.location.query);

        // if (title === "Popular") {
        //     delete newQuery.orderby;
        // } else {
        //     newQuery.orderby = "Newest";
        // }

        // this.context.messages.pushRouter(this.props.router, {pathname: this.props.router.pathname, query: newQuery});
    }

    renderRightSortBarForTodayList() {
        const items = ['Popular', 'Newest']

        const {query} = this.props.router.location
        const orderBy = !!query && !!query.orderby ? query.orderby : 'Popular'

        return (
            <div className="feedNavigation_49169 secondaryText_PM80d subtle_1BWOT base_3CbW2">
                {items.map((item, index) =>
                    <a key={index}
                       className={orderBy === item ? 'activeLink_8d28a' : ''}
                       onClick={this.onRightSortBarClick.bind(this, item)}>{item}</a>
                )}
            </div>
        )
    }

    render() {
        const {dismissBanner, showClose, title} = this.props

        return (
            <View style={[MainStyle['header_3GFef']]}>
                <View style={[MainStyle['header_title']]}>
                    <Text
                        style={[MainStyle['title_38djq'], MainStyle['featured_2W7jd'], MainStyle['default_tBeAo'], MainStyle['base_3CbW2']]}>
                        {title}
                    </Text>
                </View>
            </View>
        )
    }
}

export default PostsListTitle
