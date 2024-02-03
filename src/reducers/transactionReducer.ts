import { ActionType, CLEAR_TRANSACTION_ERROR, TRANSACTION_ACTION_FAILURE, TRANSACTION_ACTION_SUCCESSFULL, UPDATE_SORT_DIRECTIION as UPDATE_SORT_DIRECTIION } from "../actions/constants/actionTypes";
import { FIRST_PAGE_START_KEY } from "../constants/constants";

export default function transactionReducer(state: TransactionPageType, action: ActionType): TransactionPageType{
    switch(action.type){
        case TRANSACTION_ACTION_SUCCESSFULL:
            if(state.pageKeys && Array.isArray(state.pageKeys)){
                if(state.pageKeys.includes(action.payload.nextKey))
                    state.pageKeys = removeAllAfter(state.pageKeys, action.payload.nextKey);
                else
                    state.pageKeys.push(action.payload.currentKey);
            }
            else
                state.pageKeys = [action.payload.currentKey];
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
        case UPDATE_SORT_DIRECTIION:
            return {
                ...intialValue,
                request: {
                    ...intialValue.request,
                    ascending: !state.request.ascending
                },
                pageKeys: []
            }
        default:
            return state;
    }
}

function removeAllAfter(array: Array<string>, key: string){
    const indexOfElement = array.indexOf(key);
    if(indexOfElement !== -1) {
        array.splice(indexOfElement, array.length);
    }
    return array;
}

export type TransactionPageType = {
    nextKey: string;
    currentKey: string;
    transactions: Array<TransactionType>;
    error: string;
    pageKeys: Array<string>;
    request: TransactionPageRequestType
}

export type TransactionPageRequestType = {
    startKey: string;
    fulfilled: boolean | null;
    ascending: boolean;
}

export type TransactionType = {
    transactionId: string;
    price: number;
    fulfilled: boolean;
    customerName: string;
    trackUrl: string;
    createTimestamp: string;
}

export const intialValue = {
    currentKey: FIRST_PAGE_START_KEY, 
    request: {
        startKey: FIRST_PAGE_START_KEY,
        ascending: true
    } as TransactionPageRequestType,
} as TransactionPageType