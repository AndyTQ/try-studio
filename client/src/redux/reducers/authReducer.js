const initState = {
    authError: null,
    currUser: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state, 
                authError: action.err.message !== "There is no user record corresponding to this identifier. The user may have been deleted." ? action.err.message : "Invalid email address or password.",
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null, //clear authError state
                currUser: action.currUser
            };
        case 'RETRIEVE_SUCCESS':
            return {
                ...state,
                currUser: action.currUser
            }
        case 'RETRIEVE_ERROR':
            return {
                ...state,
                authError: action.err.message
            }
        case 'SIGNOUT_SUCCESS':
            return state;
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: null
            };
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: action.err.message
            };
        default:
            return state;
    }
};

export default authReducer;