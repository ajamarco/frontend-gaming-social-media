import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../Types'

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
            }                
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }

        default: 
            return state
    }
}