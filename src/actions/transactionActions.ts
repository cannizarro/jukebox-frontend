import { invokeRestApi } from "../api/axiosHelper";
import { FIRST_PAGE_START_KEY } from "../constants/constants";
import { ActionType, TRANSACTION_ACTION_FAILURE, TRANSACTION_ACTION_SUCCESSFULL } from "./constants/actionTypes";

export function getTransactions(startKey: string | undefined, currentKey: string | undefined, dispatch: React.Dispatch<ActionType>){
	invokeRestApi(
		"get",
		TRANSACTION_ACTION_SUCCESSFULL,
		TRANSACTION_ACTION_FAILURE,
		"admin/transactions",
        {startKey: startKey === FIRST_PAGE_START_KEY ? null : startKey},
        null, 
        dispatch
	)
}