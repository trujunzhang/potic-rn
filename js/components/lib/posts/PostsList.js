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

var Navigator = require('Navigator');
var PureListView = require('../../../common/PureListView');

import Posts from '../../../lib/posts'

var SessionsSectionHeader = require('../../../tabs/schedule/SessionsSectionHeader');

const {loadPosts} = require('../../../actions').default
const {byListId} = require('../../filter/filterPosts').default

const {Post} = require('../../../reducers/parseModels')

type Props = {
    listId: string;
    terms: object;
    sessions: Array<Session>;
    navigator: Navigator;
    renderEmptyList?: (day: number) => ReactElement;
};

class PostsList extends Component {

    props: Props;
    state: State;
    _innerRef: ?PureListView;

    constructor(props) {
        super(props)
        this.state = {
            listTask: byListId(props.listContainerTasks, props.listId, props.limit)
        }

        this._innerRef = null;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listTask: byListId(nextProps.listContainerTasks, nextProps.listId, nextProps.limit)
        })
    }

    componentDidMount() {
        this.loadMore()
    }

    loadMore() {
        const nextListTask = this.state.listTask
        nextListTask['ready'] = false
        this.setState({listTask: nextListTask})
        this.props.dispatch(loadPosts(nextListTask, this.props.listId, this.props.terms))
    }

    render() {
        const {
            showHeader = false,
            title,
            showClose = false,
            infinite = false,
            dismissBanner = null
        } = this.props

        const {listTask} = this.state

        const {
            results,
            hasMore,
            ready,
            totalCount,
            limit,
            firstPagination,
        } = listTask

        const showReady = Posts.showReady(results, hasMore, ready, totalCount, limit, firstPagination)

        return (
                <PureListView
            ref={this.storeInnerRef.bind(this)}
            data={results}
            renderRow={this.renderRow.bind(this)}
            // renderSectionHeader={this.renderPostsSectionHeader.bind(this)}
            renderSectionHeader={this.renderSectionHeader.bind(this)}
            {...(this.props /* flow can't guarantee the shape of props */)}
            renderEmptyList={this.renderEmptyList.bind(this)}
                />
        )
    }

    renderPostsSectionHeader(sectionData: any) {
        const title = "Posts on the xxx"
        return (<Telescope.components.PostsListTitle title={title}/>)
    }

    renderSectionHeader(header: Any, sectionID: string) {
        const title = "Posts on the xxx"
        return <SessionsSectionHeader title={title}/>;
    }

    renderRow(post: Post, day: number) {
        return (
            <Telescope.components.PostsItem
                key={post.id}
                post={post}
                type="save"
                canEdit={false}/>
        )
    }

    renderEmptyList(): ?ReactElement {
        const {listTask} = this.state,
{ready}  = listTask

if(!ready){
return (
 <Telescope.components.PostsLoading id={'load.more.hint.posts'}/>
)
}

        return (
         <View>
            <Text>Empty List</Text>
        </View>)
    }

    openSession(session: Session, day: number) {
        this.props.navigator.push({
            day,
            session,
            allSessions: this.state.todaySessions,
        });
    }

    storeInnerRef(ref: ?PureListView) {
        this._innerRef = ref;
    }

    scrollTo(...args: Array<any>) {
        this._innerRef && this._innerRef.scrollTo(...args);
    }

    getScrollResponder(): any {
        return this._innerRef && this._innerRef.getScrollResponder();
    }

}

/**
 * ## Imports
 *
 * Redux
 */
var {connect} = require('react-redux');

function select(store) {
    return {
        listContainerTasks: store.listContainerTasks
    }
}

/**
 * Connect the properties
 */

export default connect(select)(PostsList)

