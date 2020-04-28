import {
    SET_POSTS,
    LOADING_DATA, 
    LIKE_POST,
    UNLIKE_POST
} from '../Types'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state=initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex(p => p.id === action.payload.postId)
            state.posts[index] = action.payload;
            return {
                ...state
            }
    
        default:
            return state;
    }
}

/*If we like an post we add that post to posts array inside user 
we also raise the number of likes that a post has*/