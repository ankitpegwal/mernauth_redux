import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    // USER_RECORD
} from './actions'

const initialState = {
    user: {},
    token:"",
    userRecord:[]

};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                userRecord: action.payload,
            };
        case USER_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
           
    }
    return state;
}