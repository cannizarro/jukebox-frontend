import { ActionType, CLEAR_TRANSACTION_ERROR, PUSH_CURRENT_PAGE_HISTORY, TRANSACTION_ACTION_FAILURE, TRANSACTION_ACTION_SUCCESSFULL } from "../actions/constants/actionTypes";

export default function transactionReducer(state: TransactionPageType, action: ActionType): TransactionPageType{
    switch(action.type){
        case TRANSACTION_ACTION_SUCCESSFULL:
            return {
                ...state,
                ...action.payload,
                nextKey: action.payload.nextKey
            };
        case TRANSACTION_ACTION_FAILURE:
            return {
                ...state,
                error: action.payload.message
            } as TransactionPageType;
        case CLEAR_TRANSACTION_ERROR:
            return {
                ...state,
                error: ""
            }
        case PUSH_CURRENT_PAGE_HISTORY:
            if(state.pageKeys && Array.isArray(state.pageKeys))
                state.pageKeys.push(action.payload);
            else
                state.pageKeys = [action.payload];
                
            return state;
        default:
            return state;
    }
}

export type TransactionPageType = {
    nextKey: string;
    currentKey: string;
    transactions: Array<TransactionType>;
    error: string;
    pageKeys: Array<string>;
}

export type TransactionType = {
    transactionId: string;
    price: number;
    fulfilled: boolean;
    customerName: string;
    trackUrl: string;
    createTimestamp: string;
}
