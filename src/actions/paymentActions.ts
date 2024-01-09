import { invokeRestApi } from "../api/axiosHelper";
import { ActionType, PAYMENT_REQUEST_FAILURE, PAYMENT_REQUEST_LOADING, PAYMENT_REQUEST_SUCCESS } from "./constants/actionTypes";

export function pay(trackId: string, username: string | null, dispatch: React.Dispatch<ActionType>){
    dispatch({type: PAYMENT_REQUEST_LOADING} as ActionType);
    invokeRestApi(
        "post",
        PAYMENT_REQUEST_SUCCESS,
        PAYMENT_REQUEST_FAILURE,
        "customer/pay",
        {trackId, username},
        null,
        dispatch
    )
}