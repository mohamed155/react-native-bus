import axios from "axios";
import {AxiosResponse} from "axios";
import {FETCH_RANDOM_USER_FAILED, FETCH_RANDOM_USER_PENDING, FETCH_RANDOM_USER_SUCCESS} from "../actionTypes";
import {AxiosError} from "axios";

export const getRandomUser = (dispatch) => {

    dispatch({type: FETCH_RANDOM_USER_PENDING});

    axios.get('users/random_user').then((res: AxiosResponse) => {
        dispatch({
            type: FETCH_RANDOM_USER_SUCCESS,
            email: res.data.email,
            password: res.data.password
        });
    }).catch((err: AxiosError ) => {
        dispatch({
            type: FETCH_RANDOM_USER_FAILED
        })
    });
}