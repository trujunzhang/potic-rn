import Telescope from './settings'
import moment from 'moment'

const Posts = {}

/**
 * @summary Posts config namespace
 * @type {Object}
 */
Posts.config = {}

//A: which status of the post submitted by user?
//B: Pending
//   Someone will check the content and approve it
//   If the content is not good, it will be rejected
//A: you will approve the posts which status is pending?
//B: Yes
//A: which status of the posts is set from the flag on the detail page?
//B: Can you make a new status = Flagged?
//A: ok, i add a new status called Posts.config.STATUS_FLAGGED.
//A: move to trash on the wordpress, move to which status on my web app?
//B: Move to Trash is delete(Posts.config.STATUS_DELETED).
//Note: Approved is when the article is published
//      Pending is when someone submits an article

Posts.config.STATUS_PENDING = 1
Posts.config.STATUS_APPROVED = 2 // it means that the posts are published.
Posts.config.STATUS_REJECTED = 3
Posts.config.STATUS_SPAM = 4 // it means that the posts are moved to trash, the same as STATUS_DRAFT.
Posts.config.STATUS_DELETED = 5

Posts.config.STATUS_REMOVED = 7 // Articles have been removed from the database, It means that no data to show.

Posts.config.STATUS_UI_ALERT = 8 // Special status, just for the posts that no permission to view.

Posts.config.ALL_STATUS = [
    Posts.config.STATUS_PENDING,
    Posts.config.STATUS_APPROVED,
    Posts.config.STATUS_REJECTED,
    Posts.config.STATUS_SPAM,
    Posts.config.STATUS_DELETED
]

Posts.config.ALL_STATUS_FOR_USER_PROFILE = [
    Posts.config.STATUS_PENDING,
    Posts.config.STATUS_APPROVED,
    Posts.config.STATUS_REJECTED,
    Posts.config.STATUS_SPAM,
    Posts.config.STATUS_DELETED,
    Posts.config.STATUS_REMOVED
]

Posts.config.PUBLISH_STATUS = [
    Posts.config.STATUS_PENDING,
    Posts.config.STATUS_APPROVED,
    Posts.config.STATUS_REJECTED,
    Posts.config.STATUS_SPAM
]

// 18/12/2016
// When the User clicks on this notification, the article opens up in a page.
// The user should also be able to see the status of the submitted article.
// There should be only 3 types of status for the user - Pending Approval, Approved, or Rejected.
// So that when the user opens the article, he knows whether the article has been approved or not.
Posts.config.STATUS_MESSAGE_TITLES = [
    '',
    'Pending Approval',
    'Approved',
    'Rejected',
    '',
    '',
    ''
]

Posts.config.STATUS_CHECKING = [
    '',
    'pending',
    'publish',
    'reject',
    'draft',
    'trash', // trash is the same as Deleted.
    'flag'
]

Posts.config.STATUS_TITLES = [
    '',
    'Approving',
    'Published',
    'Rejected',
    'Draft',
    'Trash', // trash is the same as Deleted.
    'Flagged'
]

Posts.config.ITEM_STATUS_TITLES = [
    '',
    'Pending Approval',
    'Published',
    'Rejected',
    'Draft',
    'Trash', // trash is the same as Deleted.
    'Flagged'
]

/**
 * @summary generate 15 days as the day filter for posts list admin
 */
Posts.getDateQueryString = function (date) {
    return moment(date).format('YYYY-MM-DD')
}

Posts.getPostStatus = (post, state) => {
    let statusArray = []
    let postStatus = Posts.config.STATUS_CHECKING[post.status]
    if (state.toLowerCase() !== postStatus.toLowerCase()) {
        if (post.status !== Posts.config.STATUS_APPROVED) {
            statusArray.push(postStatus)
        }
    }

    return statusArray
}

/**
 * @summary generate 15 days as the day filter for posts list admin
 */
Posts.getDateSelectors = function () {
    const size = 15
    let REFERENCE = moment(new Date()) // today
    let currentYear = REFERENCE.format('YYYY')

    const dateSelectors = []
    for (var i = 0; i < size; i++) {
        const date = REFERENCE.clone().subtract(i, 'months')
        const queryString = moment(date).format('YYYY-MM')
        const year = moment(date).format('YYYY')
        //if (currentYear !== year) {
        //break;
        //}

        const title = date.format('MMMM YYYY')
        dateSelectors.push({'query': queryString, 'title': title})
    }

    return dateSelectors
}

Posts.showReady = function (results, hasMore, ready, totalCount, limit, firstPagination) {
    if (!firstPagination) { // ignoring it, if not the first pagination.
        return false
    }
    if (typeof totalCount === 'undefined' || !ready || typeof results === 'undefined') {
        return true
    }
    if (ready && !hasMore && results.length === 0) {//empty list
        return false
    }
    if (!ready && hasMore && results.length <= limit) {// first pagination and already ready.
        return true
    }
    if (hasMore && !!results && results.length > limit) {
        return false
    }
    if (hasMore && (results.length % limit) !== 0) {
        return true
    }
    return false
}

/**
 * @summary limit the post's content
 * @param {Object} content
 * @param limit
 */
Posts.getLimitedContent = function (content, limit) {
    let mytextlet = content

    if ((content).length > limit) {
        mytextlet = content.substring(0, limit - 3) + '...'
    }
    return mytextlet
}

Posts.getDefaultImageFromType = (post) => {
    if (post.userId === Telescope.settings.get('scraped_user_id', 'yv57iwi6Zq8jaM7uD')) {
        const author = post.author
        if (!!author) {
            return 'default/' + author + '.jpg'
        }
    }

    return null
}

/**
 * @summary Get the complete thumbnail url whether it is hosted on Embedly or on an external website, or locally in the app.
 * @param {Object} post
 */
Posts.getImageFromType = (post) => {
    let thumbnailUrl = null
    // http://localhost:3000/cdn/storage/undefined/268cc214-4cd0-47a8-a2d2-444d72eaa5b1/thumbnail400/268cc214-4cd0-47a8-a2d2-444d72eaa5b1
    // http://localhost:3000/files/images/Images/39c72a14-2bec-4d5c-b9de-fc076b26e026/thumbnail400/39c72a14-2bec-4d5c-b9de-fc076b26e026.jpg

    let cloudinaryUrls = post.cloudinaryUrls
    if (!!cloudinaryUrls && cloudinaryUrls.length > 0) {
        thumbnailUrl = cloudinaryUrls[0].url
    }
    else if (!thumbnailUrl && !!post.thumbnailUrl) {
        //thumbnailUrl = post.thumbnailUrl
    }
    if (!!thumbnailUrl) {
        return thumbnailUrl
        //     return thumbnailUrl.indexOf('//') > -1 ? Telescope.utils.addHttp(thumbnailUrl) : Telescope.utils.getSiteUrl() + thumbnailUrl;
    }

    return Posts.getDefaultImageFromType(post)
}

/**
 * @summary Get the complete thumbnail url whether it is hosted on Embedly or on an external website, or locally in the app.
 * @param {Object} post
 */
Posts.getThumbnailSet = (post) => {
    const small = Posts.getImageFromType(post)

    return {small: small}
}

/**
 * @summary Convert date to string using moment.js
 * @param {Object} date
 */
Posts.getDailyDateTitle = function (date) {
    let title = ''

    if (!!date) {
        let REFERENCE = moment(new Date()) // today
        let TODAY = REFERENCE.clone().startOf('day')
        let YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day')

        const momentDate = moment(date)
        let prefix = ''
        if (momentDate.isSame(TODAY, 'd')) {
            title = 'Today, ' + momentDate.format('MMMM Do')
        } else if (momentDate.isSame(YESTERDAY, 'd')) {
            title = 'Yesterday, ' + momentDate.format('MMMM Do')
        } else {
            title = momentDate.format('dddd, MMMM Do')
        }
    }

    return title
}

/**
 * @summary statistic topics.
 */
Posts.generatePostListTitle = function (location, params) {
    const query = params
    let title = null

    // debugger
    let preTitle = 'Articles'

    if (query.query) {
        title = `${preTitle} in ${query.query}`
    }
    else if (query.domain) {
        title = `${preTitle} in ${query.domain}`
    }
    else if (query.author) {
        title = `${preTitle} in ${query.author}`
    } else if (query.userId) {
        title = `${preTitle} by ${query.title}`
    }
    else if (query.after) {
        if (query.cat || query.topicId) {
            title = `${query.title} on ${moment(query.after).format('MMMM Do')}`
        } else {
            title = Posts.getDailyDateTitle(moment(query.after))
        }
    } else if (query.cat || query.topicId) {
        title = `${preTitle} in ${query.title}`
    }

    if (query.admin) {
        if (!title) {
            let status = query.status
            title = `${preTitle} in ${status}`
        }
        title += ' [APPROVING]'
    }

    // title = 'Posts on the xxx'
    return {showHeader: !!title, title: title}
}

Posts.getTotalCount = (props, status) => {
    let count = 0
    switch (status) {
        case 'publish':
            count = props.publishCount
            break
        case 'flag':
            count = props.flaggedCount
            break
        case 'pending':
            count = props.pendingCount
            break
        case 'reject':
            count = props.rejectedCount
            break
        case 'draft':
            count = props.draftCount
            break
        case 'trash':
            count = props.trashCount
            break
        default:
            count = props.allCount
            break
    }

    return count
}

Posts.getNormalPostStatusSet = () => {
    return [
        {value: -1, title: '— No Change —'},
        {value: Posts.config.STATUS_APPROVED, title: 'Published'},
        {value: Posts.config.STATUS_PENDING, title: 'Pending Review'},
        {value: Posts.config.STATUS_REJECTED, title: 'Rejected'},
        {value: Posts.config.STATUS_SPAM, title: 'Draft'}
    ]
}

Posts.getSelectedPosts = (results, checkIds) => {
    return results.map((item, index) => {
        if (checkIds.indexOf(item.id) !== -1)
            return post
    })
}

Posts.generateTwitterShareLink = function (post) {

    const twitterVia = Telescope.settings.get('twitterAccount', 'Getpoliticl')
    const splits = []
    splits.push('url=' + post.url)
    splits.push('via=' + twitterVia)
    splits.push('text=' + post.title)

    return 'https://twitter.com/share?' + splits.join('&')
}

/**
 *
 * https://www.facebook.com/dialog/share?
 * app_id=1549529981961270&href=http://scruby.site/?postId=hHMiCtoJkHEN56tQB&title=a-snapdragon-835-powered-windows-10-device-isn-t-far-away&quote=
 *
 */
Posts.generateFacebookShareLink = function (post) {
    //splits.push("u=" + post.url);
    let facebookId = Telescope.settings.get('FACEBOOK_APP_ID')
    const splits = []
    splits.push('app_id=' + facebookId)
    splits.push('href=' + post.url)
    splits.push('quote=')
    return 'https://www.facebook.com/dialog/share?' + splits.join('&')
}

Posts.generatePostPageUrl = function (router) {
    const prefix = Telescope.utils.getSiteUrl()
    const postId = router.location.query.postId
    return `${prefix}/?postId=${postId}`
}

Posts.generateCommentTwitterShareLink = function (router, comment) {

    //href="https://twitter.com/share?
    //url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&
    //via=twitterdev&
    //related=twitterapi%2Ctwitter&
    //hashtags=example%2Cdemo&
    //text=custom%20share%20text"

    //$(location).attr('href');

    const twitterVia = Telescope.settings.get('twitterAccount', 'Getpoliticl')

    const url = Posts.generatePostPageUrl(router)
    const userName = Users.getDisplayName(comment.user)
    let text = comment.body
    text = '\"' + text.substring(0, 50) + '...\"' + ' — ' + userName

    const splits = []
    splits.push('via=' + twitterVia)
    splits.push('url=' + url)
    splits.push('text=' + text)
    return 'https://twitter.com/share?' + splits.join('&')
}

Posts.generateCommentFacebookShareLink = function (router, comment) {
    //https://www.facebook.com/dialog/feed?
    //  app_id=1389892087910588
    //  &redirect_uri=https://scotch.io
    //  &link=https://scotch.io
    //  &picture=http://placekitten.com/500/500
    //  &caption=This%20is%20the%20caption
    //  &description=This%20is%20the%20description

    let facebookId = Telescope.settings.get('FACEBOOK_APP_ID')
    const url = Posts.generatePostPageUrl(router)
    let text = comment.body

    const splits = []

    splits.push('app_id=' + facebookId)
    splits.push('href=' + url)
    splits.push('quote=' + text)

    return 'https://www.facebook.com/dialog/share?' + splits.join('&')
}

export default Posts
