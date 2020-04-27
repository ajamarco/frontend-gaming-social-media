import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER} from '../Types'

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
                ...state,
                authenticated: true, 
                credentials: action.payload
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

        default: 
            return state
    }
}