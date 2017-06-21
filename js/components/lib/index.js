'use strict'

import Telescope from './config'

// posts
Telescope.registerComponent('PostsDomain',                require('./posts/PostsDomain.js').default)
Telescope.registerComponent('PostsHome',                  require('./posts/PostsHome.js').default)
Telescope.registerComponent('PostsItem',                  require('./posts/PostsItem.js').default)
Telescope.registerComponent('PostsList',                  require('./posts/PostsList.js').default)
Telescope.registerComponent('PostsListTitle',             require('./posts/PostsListTitle.js').default)
Telescope.registerComponent('PostsLoadMore',              require('./posts/PostsLoadMore.js').default)
Telescope.registerComponent('PostsLoading',               require('./posts/PostsLoading.js').default)
Telescope.registerComponent('PostsNoResults',             require('./posts/PostsNoResults.js').default)

export default Telescope
