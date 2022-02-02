import {FETCH_RANDOM_USER_FAILED, FETCH_RANDOM_USER_PENDING, FETCH_RANDOM_USER_SUCCESS} from "../actionTypes";

const initialState = {
    email: '',
    password: '',
    pending: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RANDOM_USER_PENDING:
            return {...state, pending: true};
        case FETCH_RANDOM_USER_SUCCESS:
            return {...state, email: action.email, password: action.password, pending: false};
        case FETCH_RANDOM_USER_FAILED:
            return {...state, email: '', password: '', pending: false};
        default:
            return state;
    }
}

export default reducer;