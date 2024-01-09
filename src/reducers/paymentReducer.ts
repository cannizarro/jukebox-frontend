import { ActionType, PAYMENT_REQUEST_FAILURE, PAYMENT_REQUEST_LOADING, PAYMENT_REQUEST_SUCCESS } from "../actions/constants/actionTypes";

export default function paymentReducer(state: PaymentStateType, action: ActionType){
    switch(action.type){
        case PAYMENT_REQUEST_LOADING:
            return {
                loading: true
            } as PaymentStateType;
        case PAYMENT_REQUEST_SUCCESS:
            return {
                loading: false,
                fulfilled: true
            } as PaymentStateType;
        case PAYMENT_REQUEST_FAILURE:
            return {error: action.payload.message} as PaymentStateType;
        default:
            return state;
    }
}


export type PaymentStateType = {
    loading: boolean,
    fulfilled: boolean,
    error: string
}