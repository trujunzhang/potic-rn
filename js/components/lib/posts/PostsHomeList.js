import Telescope from '../index'
import React, {Component} from 'react'

class PostsHomeList extends Component {

    renderNormal() {
        const {results, hasMore, ready, title, showHeader, showClose, dismissBanner, loadMore} = this.props
        return (
            <section className="results_37tfm">
                <div>
                    <div className="fullWidthBox_3Dggh box_c4OJj">
                        <div className="content_DcBqe">
                            {showHeader ? <Telescope.components.PostsListTitle
                                title={title}
                                showClose={showClose}
                                dismissBanner={dismissBanner}/>
                                : null}
                            <div>
                                <ul className="postsList_3n2Ck">
                                    {results.map((post, index) =>
                                        <Telescope.components.PostsItem
                                            key={post.id}
                                            post={post}
                                            type="save"
                                            canEdit={false}/>
                                    )}
                                </ul>
                            </div>
                        </div>
                        {hasMore ? (ready ? <Telescope.components.PostsLoadMore loadMore={loadMore}/> : null) : null}
                    </div>
                </div>
                {hasMore ? (ready ? null : <Telescope.components.PostsLoading id={'load.more.hint.posts'}/>) : null}
            </section>
        )
    }

    render() {
        return this.renderNormal()
    }
}

export default PostsHomeList

