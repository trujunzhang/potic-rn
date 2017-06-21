/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */


const Parse = require('parse/react-native');

import type {ThunkAction} from './types'

let Objects = require('./objects').default

const PostsParameters = require('../parameters').Posts

/**
 * The states were interested in
 */
const {
    LIST_VIEW_LOADED_POSTS,
    DASHBOARD_LOADED_POSTS,
    OVERLAY_LOADED_POSTS_PAGE
} = require('../lib/constants').default

function loadParseObject(type: string, query: Parse.Query, objectId: string): ThunkAction {
    return (dispatch) => {
        return query.get(objectId, {
            success: (object) => {
                // Flow can't guarantee {type, list} is a valid action
                const data = {
                    objectId: objectId,
                    object: object
                }
                dispatch({type, data})
            },
            error: (error) => {
                debugger
            }
        })

    }

}

function loadParseQuery(type: string, query: Parse.Query, listTask: Any, listId: string, limit: int): ThunkAction {
    return (dispatch) => {
        let queryFind = (() => {
            return query.find({
                success: (list) => {
                    // debugger
                    // debugger
                    // Flow can't guarantee {type, list} is a valid action
                    const payload = {
                        list: list,
                        listTask: listTask,
                        listId: listId,
                        limit: limit,
                        totalCount: totalCount
                    }
                    dispatch({type, payload})
                },
                error: (error) => {
                    debugger
                }
            })
        })

        let totalCount = 0
        return query.count({
            success: function (count) {
                totalCount = count
                // queryFind()
            },
            error: function (error) {
                debugger
                // queryFind()
                console.log('failure')
            }
        }).then(() => {
            // debugger
            return queryFind()
        })

    }
}

export default {
    loadPosts: (listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_POSTS): ThunkAction => {
        const {pageIndex, limit} = listTask
        const skipCount = (pageIndex - 1) * limit

        let postQuery = new PostsParameters(new Parse.Query(Objects.Post).include('topics'))
            .addParameters(terms)
            .end()

        return loadParseQuery(type, postQuery.skip(skipCount).limit(limit), listTask, listId, limit)
    },

    loadPostPage: (objectId: string): ThunkAction => {
        let pageQuery = new Parse.Query(Objects.Post).include('topics')

        return loadParseObject(OVERLAY_LOADED_POSTS_PAGE, pageQuery, objectId)
    },

    statisticPosts: (listTask: Any, listId: string, terms: Any, type: string = LIST_VIEW_LOADED_POSTS): ThunkAction => {
        const {pageIndex, limit} = listTask
        const skipCount = (pageIndex - 1) * limit

        let postQuery = new PostsParameters(new Parse.Query(Objects.Post).include('topics'))
            .addParameters(terms)
            .end()

        return loadParseQuery(type, postQuery.skip(skipCount).limit(limit), listTask, listId, limit)
    }

}
