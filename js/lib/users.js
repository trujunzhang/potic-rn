import Telescope from '../components/lib/index'
import React from 'react'
let _ = require('underscore')
let md5 = require('blueimp-md5')

const Users = {}

/**
 * @summary Check if a user is an admin
 * @param {Object|string} user - The user or their userId
 */
Users.isAdmin = function (user) {
  try {
    return !!user && !!user.isAdmin
  } catch (e) {
    return false // user not logged in
  }
}

Users.isAdminById = Users.isAdmin

Users.getLinkObject = function (type, user = null, folder = null) {
  const userLink = !!user ? `/users/${user.slug}` : null
  switch (type) {
    case 'homepage':
      return {pathname: '/'}
    case 'editing':
      return {pathname: '/users/my/edit'}
    case 'profile':
      return {pathname: userLink}
    case 'downvotes':
      return {pathname: `${userLink}/downvotes`}
    case 'submittedPosts':
      return {pathname: `${userLink}/posts`}
    case 'collections':
      return {pathname: `${userLink}/collections`}
    case 'folderItem':
      return {pathname: `${userLink}/collections/${folder._id}/${folder.name}`}
  }
}

Users.checkIsHomepage = function (location) {
  if (location.pathname === '/') {
    if (Object.keys(location.query).length === 0) {
      return true
    }
    if (Object.keys(location.query).length === 1 && !!location.query.admin) {
      return true
    }
    if (Object.keys(location.query).length === 1 && !!location.query.orderby) {
      return true
    }
  }
  return false
}

/**
 * @summary Get a user's email hash
 * @param {Object} user
 */
Users.getEmailHash = function (user) {
  return md5(user.email)
}

/**
 * @summary Check if a user has upvoted a document
 * @param {Object} user
 * @param {Object} document
 */
Users.hasUpvoted = function (user, document) {
  return user && _.include(document.upvoters, user._id)
}

/**
 * @summary Check if a user has downvoted a document
 * @param {Object} user
 * @param {Object} document
 */
Users.hasDownvoted = function (user, document) {
  return user && _.include(document.downvoters, user._id)
}

Users.renderWithSideBar = function (children) {
  return (
    <div className="constraintWidth_ZyYbM container_3aBgK">
      <div className="content_1jnXo">
        {children}
        <Telescope.components.AppSideBar/>
      </div>
    </div>
  )
}

Users.isMobileDevice = function () {
  return false
}

Users.getCollectionsPopover = function (left, top, popWidth, popHeight, offX, defaultClassName = 'v-bottom-left') {
  if (Users.isMobileDevice()) {
    return {
      style: {
        top: (popHeight === -1) ? top : (((window.innerHeight - popHeight) / 2) + window.pageYOffset),
        left: ((window.innerWidth - popWidth ) / 2 + offX)
      },
      className: 'popover v-center-center'
    }
  }

  return {style: {top: top, left: left + offX}, className: `popover ${defaultClassName}`}
}

Users.getPopoverMenuArray = function (user, isMobileDevice) {
  const menuArrays = []
  if (!!isMobileDevice) {
    menuArrays.push([
      {type: 'acticle', link: {pathname: '/', query: {action: 'new'}}, title: 'Submit an article'},
      {type: 'separator'}
    ])
  }
  menuArrays.push([
    {type: 'profile', link: Users.getLinkObject('profile', user), title: 'MY PROFILE'},
    {type: 'collections', link: Users.getLinkObject('collections', user), title: 'MY COLLECTIONS'},
    {type: 'separator'}
  ])
  menuArrays.push([
    {type: 'settings', link: Users.getLinkObject('editing'), title: 'SETTINGS'},
    {type: Users.isAdmin(user) ? 'management' : '', link: {pathname: '/management'}, title: 'MANAGEMENT'},
    {type: 'separator'}
  ])
  menuArrays.push([
    {type: 'logout', title: 'LOGOUT'}
  ])
  return _.flatten(menuArrays)
}

Users.checkArticleInFolder = function (postId, folder) {
  return folder.posts.indexOf(postId) !== -1
}

{/*<Avatar googleId="118096717852922241760" size="100" round="true" />*/}
{/*<Avatar facebookId="100008343750912" size="150" />*/}
{/*<Avatar vkontakteId="1" size="150" />*/}
{/*<Avatar skypeId="sitebase" size="200" />*/}
{/*<Avatar twitterHandle="sitebase" size="40" />*/}
{/*<Avatar name="Wim Mostmans" size="150" />*/}
{/*<Avatar name="Wim Mostmans" size="150" textSizeRatio="1.75" />*/}
{/*<Avatar value="86%" size="40" />*/}
{/*<Avatar size="100" facebook-id="invalidfacebookusername" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" />*/}
Users.getAvatarObj = function (user) {
  if (!user) {
    return {
      title: '',
      slug: '',
      avatarId: '',
      avatar: {
        name: ''
      }
    }
  }
  const {loginType} = user
  switch (loginType) {
    case 'email':
      return {
        title: Users.getDisplayName(user),
        slug: user.slug,
        avatarId: user.id,
        avatar: {
          email: user.email,
          name: Users.getDisplayName(user)
        }
      }
  }
}

/**
 * @summary Get a user's display name (not unique, can take special characters and spaces)
 * @param {Object} user
 */
Users.getDisplayName = function (user) {
  if (typeof user === 'undefined') {
    return ''
  } else {
    return user.name
  }
}

/**
 * Check the post is for the backend admins.
 * @param location
 * @param user
 * @returns {boolean}
 */
Users.checkIsAdmin = function (location, user) {
  // Dashboard UI(for admin)
  let {admin} = location.query
  if (!admin || !user) {
    return false
  }
  else if (!!admin && user.isAdmin) {
    return true
  }
  return false
}

Users.openNewBackgroundTab = (element, url) => {
  window.open(url)
}

/**
 * ("http://localhost:3000/image/upload/cover/k6ikrrYh9y5ZDvzvR.jpg")
 * @param user
 * @returns {*}
 */
Users.getUserCoverUrl = (user) => {
  if (typeof user === 'undefined') {
    return null
  }
  let coverUrls = user.coverUrls || []
  if (!!coverUrls && coverUrls.length > 0) {
    return coverUrls[0].url
  }
  return null
}

/**
 * @summary Get a user's Twitter name
 * @param {Object} user
 */
Users.getTwitterName = function (user) {
  // return twitter name provided by user, or else the one used for twitter login
  if (typeof user !== 'undefined') {
    return ''
  }
  return null
}

/**
 * @summary Get a user's display name (not unique, can take special characters and spaces)
 * @param {Object} user
 */
Users.getBio = function (user) {
  if (typeof user === 'undefined') {
    return ''
  } else {
    return ''
  }
}

export default Users
