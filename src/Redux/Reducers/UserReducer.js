import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, REMOVE_LIKE, ADD_LIKE} from '../Types'

const initialState = {
    authenticated : false,
    credentials: {}, 
    likes: [],
    loading: false,
    notifications: []
};

export default function (state = initialState, action){
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                //TODO: remove likes from inside credentials
                ...state,
                authenticated: true, 
                credentials: action.payload,
                likes: action.payload.likes
            }                
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                credentials: action.payload
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case REMOVE_LIKE:
            return {
                ...state,
                likes: state.likes.filter(p => p !== action.payload),
                loading: false
            }
        case ADD_LIKE:
            return {
                ...state,
                likes: [...state.likes, action.payload],
                loading: false
            }
            
        default: 
            return state
    }
}