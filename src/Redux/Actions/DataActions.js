import {SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST} from '../Types'

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

//like post
export const likePost = (postId) => dispatch => {
    //TODO: create function in Requests to go to the backend and create a new like action
}

//unlike post
export const unlikePost = (postId) => dispatch => {
    //TODO: create function in Requests to go to the backend and create a new like action
}