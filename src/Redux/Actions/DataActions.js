import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, DELETE_POST, REMOVE_LIKE, ADD_LIKE, NEW_POST, SET_POST, FINISH_LOADING, LOADING_UI, UPDATE_POST_OBJECT, NEW_COMMENT, SET_UNLOADING} from '../Types'

import Requests from '../../Libraries/Requests'

//get posts
export const getPosts = () => dispatch => {
    dispatch({type: LOADING_DATA});
    Requests.fetchPosts()
      .then(data => dispatch({
          type: SET_POSTS,
          payload: data
      }))
}

export const deletePost = (postId) => dispatch => {
    dispatch({type: LOADING_DATA});
    Requests.deletePost(postId)
        .then(data => {
            dispatch({
                type: DELETE_POST,
                payload: data.data
            })
        })
}

//like post
export const likePost = (body) => dispatch => {
    dispatch({type: LOADING_DATA});
    Requests.likePost(body)
        .then(data => {
            dispatch({type: LIKE_POST, 
                payload: data.data.post_id});
            dispatch({type: UPDATE_POST_OBJECT,
                payload: data.data.post_id})
            dispatch({type: ADD_LIKE, 
            payload: data.data.post_id});
            dispatch({type: FINISH_LOADING})

        })
}

export const createNewPost = (body) => dispatch => {
    dispatch({type: LOADING_DATA});
    Requests.addPost(body)
        .then(data => {
            dispatch({type: NEW_POST, 
                payload: data});
        })
}

//unlike post
export const unlikePost = (body) => dispatch => {
    dispatch({type: LOADING_DATA});
    Requests.unlikePost(body)
        .then(data => {
            dispatch({type: UNLIKE_POST, 
                payload: data.data.post_id});
            dispatch({type: REMOVE_LIKE, 
            payload: data.data.post_id});
            dispatch({type: UPDATE_POST_OBJECT,
                payload: data.data.post_id})
            dispatch({type: FINISH_LOADING})
        })
}

export const getPost = (postId) => dispatch => {
    dispatch({type: LOADING_UI});
    Requests.getPost(postId)
        .then(data => {
            dispatch({type: SET_POST,
            payload: data})
            dispatch({type: FINISH_LOADING})
        })
}

export const submitComment = (comment) => dispatch => {
    dispatch({type: LOADING_DATA});
    Requests.createComment(comment)
        .then(data => {
            dispatch({type: UPDATE_POST_OBJECT,
                payload: data.post_id})
            dispatch({type: NEW_COMMENT,
                payload: data})
            dispatch({type: FINISH_LOADING});
            dispatch({type: SET_UNLOADING})
        })
}

