import moment from 'moment'

export default class PostsParameters {
    constructor(query: Parse.Query) {
        this.query = query
    }

    addParameters(terms: Any) {
        if (terms.related) { // related posts
            // this.query.notContainedIn('objectId', terms.related.id)
            // this.query.equalTo('author', terms.related.author)
        }

        if (terms.before && terms.after) { // Calendar posts

            var mAfter = moment(terms.after, 'YYYY-MM-DD')
            var startOfDay = mAfter.startOf('day')

            // from the start of the date (inclusive)
            this.query.greaterThanOrEqualTo('postedAt', startOfDay.toDate())

            var mBefore = moment(terms.before, 'YYYY-MM-DD')
            var endOfDay = mBefore.endOf('day')

            // till the start of tomorrow (non-inclusive)
            this.query.lessThan('postedAt', endOfDay.toDate())
        }

        if (terms.domain) {
            this.query.equalTo('sourceFrom', terms.domain)
        }

        if (terms.author) {
            this.query.equalTo('author', terms.author)
        }

        return this
    }

    end() {
        return this.query
    }

}


