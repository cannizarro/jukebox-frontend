import axios from "axios";
import { ActionType } from "../actions/constants/actionTypes";

const DEFAULT_REQUEST_TIMEOUT = 60000;

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
    timeout: DEFAULT_REQUEST_TIMEOUT,
    withCredentials: true,
    headers: {
        ...axios.defaults.headers,
        "Content-Type": "application/json"
    }
});

export function invokeRestApi(method: string, successAction: string, errorAction: string, url: string, params: object | null, body: object | null, dispatch: React.Dispatch<ActionType> | null){
    return axiosClient({
        method,
        params,
        url,
        data: body
    })
    .then(response => {
        dispatch && dispatch({type: successAction, payload: response.data});
        return response.data;
    })
    .catch(errorData => {
        dispatch && dispatch({type: errorAction, payload: errorData});
        return Promise.reject(errorData);
    });
}
